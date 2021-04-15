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
    insideToolImage("node:14-browsers", [insideArgs: "-e HOME"]) {
      releaseVersion = utils.generateLongTag(new Date())

      stage("Install dependencies") {
        sh "npm ci"
      }

      stage("Lint") {
        sh "npm run lint"
      }

      stage("Test:UNIT") {
        sh "npm test"
      }

      stage("Generate build") {
        sh "npm run build:ci"
        sh 'gzip -9v stats.json'
        stash name: 'build', includes: 'build/**'
      }

      stage("Archive artifacts and stats") {
        sh "./scripts/generate-size-reports.sh"
        archiveWebpackStatsAndReports()
      }

      stage("Test:E2E") {
        try {
          sh "./scripts/serve-dist.sh &"
          sh "./node_modules/.bin/wait-on http-get://localhost:3000"
          sh "npm run test:e2e"
        } finally {
          sh "pkill -f http-server"
          archiveArtifacts artifacts: "e2e/cypress/screenshots/**,e2e/cypress/videos/**,e2e/cypress/integration/__image_snapshots__/**", fingerprint: true
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
