#!/usr/bin/env groovy

// See https://github.com/capralifecycle/jenkins-pipeline-library
@Library("cals") _

def pipelines = new no.capraconsulting.buildtools.lifligcdkpipelines.LifligCdkPipelines()
def webapp = new no.capraconsulting.buildtools.cdk.Webapp()
def utils = new no.capraconsulting.buildtools.Utils()

// TODO: Replace with bucket name and role arn for your project
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
  // TODO: Replace with Slack-channel for your project
  slack: [channel: "#cals-dev-info"],
) {
  dockerNode {
    checkout scm

    def img = docker.image("mcr.microsoft.com/playwright:v1.40.0-jammy")
    img.pull()
    
    img.inside("-e AWS_CONTAINER_CREDENTIALS_RELATIVE_URI"){
      stage("Install dependencies") {
        sh "npm ci --legacy-peer-deps"
      }

      stage("Lint") {
        sh "npm run lint"
      }

      stage("Generate build") {
        sh "npm run build:ci"
        stash name: 'build', includes: 'build/**'
      }

      stage("Test:Unit"){
        sh "npm run test"
      }
      stage("Test:Component") {
        try {
          sh "npm run test:component:ci"
        } catch {
            archiveArtifacts artifacts: "test-results/**, __snapshots__/**", fingerprint: true
        }
      }
      stage("Test:E2E") {
        try {
          sh "npm run test:e2e:ci"
        } catch {
            archiveArtifacts artifacts: "test-results/**", fingerprint: true
        }
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
              "devWebappArtifactS3Key": s3Key,
            ],
            variablesNamespace: "webapp",
            variablesVersion: "v2",
            region: "eu-west-1",
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
              "prodWebappArtifactS3Key": s3Key,
            ],
            variablesNamespace: "webapp",
            variablesVersion: "v2",
            region: "eu-west-1",
          )
        }
      }
    }
  }
}

// TODO: Consider moving this to pipeline lib.
def archiveWebpackStatsAndReports() {
  archiveArtifacts artifacts: 'stats.json.gz,size-report*,bundle-analyze-report.html', fingerprint: true

  plot([
    csvFileName: 'plot-size-report-bytes.csv',
    csvSeries: [[
      file: 'size-report-bytes.csv',
    ]],
    group: 'build-size-report',
    keepRecords: true,
    title: 'Size by file extension in dist',
    yaxis: 'bytes',
  ])

  plot([
    csvFileName: 'plot-size-report-filecount.csv',
    csvSeries: [[
      file: 'size-report-filecount.csv',
    ]],
    group: 'build-size-report',
    keepRecords: true,
    title: 'Number of files by file extension in dist',
    yaxis: '#',
  ])
}
