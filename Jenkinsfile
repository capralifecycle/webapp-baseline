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

      def s3Key
      stage("Upload to S3") {
        s3Key = uploadArtifactDirAsZip(
          artifactDir: "build",
          artifactsBucketName: artifactsBucketName,
          artifactsRoleArn: artifactsRoleArn,
        )
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
              "WebappArtifactS3Key": s3Key,
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
              "WebappArtifactS3Key": s3Key,
            ],
            variablesNamespace: "webapp",
          )
        }
      }
    }
  }
}

// TODO: Move to jenkins-pipeline-library.
def uploadArtifactDirAsZip(Map config) {
  def artifactDir = require(config, "artifactDir")
  def artifactsBucketName = require(config, "artifactsBucketName")
  def artifactsRoleArn = require(config, "artifactsRoleArn")

  dir(artifactDir) {
    sh """
      rm -f /tmp/artifact.zip
      zip -r /tmp/artifact.zip .
    """
  }

  // TODO: The zip file will include timestamps causing new hash to
  //  be created even when it has the same file contents.
  //  Consider reworking this so we can produce deterministic zip
  //  files for the same content excluding timestamps.

  def sha256 = sh([
    returnStdout: true,
    script: "sha256sum /tmp/artifact.zip | awk '{print \$1}'"
  ]).trim()

  def s3Key = "${sha256}.zip"
  def s3Url = "s3://$artifactsBucketName/$s3Key"

  withAwsRole(artifactsRoleArn) {
    sh "aws s3 cp /tmp/artifact.zip $s3Url"
  }

  sh "rm /tmp/artifact.zip"

  s3Key
}

private def require(Map config, String name) {
  if (!config.containsKey(name)) {
    throw new Exception("Missing $name")
  }
  return config[name]
}
