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

    // Pass HOME to persist $HOME/.cache on executor for Cypress install.
    insideToolImage("node:16", [insideArgs: "-e HOME"]) {
      stage("Install dependencies") {
        sh "npm ci --legacy-peer-deps"
      }

      stage("Lint") {
        sh "npm run lint"
      }

      stage("Test:UNIT") {
        sh "npm test"
      }

      stage("Generate build") {
        sh "npm run build:ci"
        stash name: 'build', includes: 'build/**'
      }

      stage("Archive artifacts and stats") {
        sh "./scripts/generate-size-reports.sh"
        archiveWebpackStatsAndReports()
      }

      stage("Test with Ladle") {
        try {

          docker.image('mcr.microsoft.com/playwright:v1.37.0-jammy').inside {
            sh "npm run ladle:build"
            sh "npm run preview &"
            sh "./node_modules/.bin/wait-on http-get://localhost:3000"
            sh "npm run ladle:playwright"
          }
        } finally {
          // bug causes this to take forever, but this is also not necessary
          // sh "pkill -f http-server"
          //archiveArtifacts artifacts: "cypress/videos/**, cypress-visual-screenshots/**", fingerprint: true
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
