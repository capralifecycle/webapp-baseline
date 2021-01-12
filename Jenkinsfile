#!/usr/bin/env groovy

// See https://github.com/capralifecycle/jenkins-pipeline-library
@Library('cals') _

def pipelines = new no.capraconsulting.buildtools.lifligcdkpipelines.LifligCdkPipelines()
def webapp = new no.capraconsulting.buildtools.cdk.Webapp()

def artifactsBucketName = "incub-common-build-artifacts-001112238813-eu-west-1"
def artifactsRoleArn = "arn:aws:iam::001112238813:role/incub-common-build-artifacts-liflig-jenkins"

buildConfig(
  jobProperties: [
    parameters([
      booleanParam(
        defaultValue: false,
        description: "Skip branch check - force deploy to DEV",
        name: "devOverrideBranchCheck"
      ),
    ])
  ],
  slack: [channel: "#cals-dev-info"],
) {
  dockerNode {
    checkout scm

    insideToolImage('node:14-browsers') {
      stage('Install dependencies') {
        sh 'npm ci'
      }

      stage('Lint') {
        sh 'npm run lint'
      }

      stage('Run normal tests') {
        sh 'npm test'
      }

      /* temporary disabled since it does not work with 14-browsers
      analyzeSonarCloudForJs([
        'sonar.organization': 'capraconsulting',
        'sonar.projectKey': 'capraconsulting_webapp-baseline',
      ])
      */

      stage('Generate build') {
        sh 'npm run build'
      }

      stage('Run e2e tests') {
        sh 'npm run test:e2e:jenkins'
      }

      def s3Url
      stage("Upload to S3") {
        s3Url = webapp.publish {
          name = "webapp-baseline"
          roleArn = artifactsRoleArn
          bucketName = artifactsBucketName
        }
      }

      // CDK App - see https://github.com/capralifecycle/liflig-cdk-app-reference

      def deployDev = params.devOverrideBranchCheck || env.BRANCH_NAME == "master"
      if (deployDev) {
        stage("Trigger dev pipeline") {
          pipelines.configureVariablesAndTrigger(
            artifactsRoleArn: artifactsRoleArn,
            artifactsBucketName: artifactsBucketName,
            pipelineName: "cdkappref-core-dev",
            variables: [
              "WebappS3Url": s3Url,
            ],
            variablesNamespace: "webapp",
          )
        }
      }

      def deployProd = env.BRANCH_NAME == "master"
      if (deployProd) {
        stage("Trigger prod pipeline") {
          pipelines.configureVariablesAndTrigger(
            artifactsRoleArn: artifactsRoleArn,
            artifactsBucketName: artifactsBucketName,
            pipelineName: "cdkappref-core-prod",
            variables: [
              "WebappS3Url": s3Url,
            ],
            variablesNamespace: "webapp",
          )
        }
      }
    }
  }
}
