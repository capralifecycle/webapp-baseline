#!/usr/bin/env groovy

// See https://github.com/capralifecycle/jenkins-pipeline-library
@Library('cals') _

buildConfig {
  dockerNode {
    checkout scm

    def img = docker.image('circleci/node:11-browsers')
    img.pull()
    img.inside {
      stage('Install dependencies') {
        sh 'npm ci'
      }

      stage('Lint') {
        sh 'npm run lint'
      }

      stage('Run normal tests') {
        sh 'npm test'
      }

      stage('Generate build') {
        sh 'npm run build'
      }

      stage('Run e2e tests') {
        sh 'npm run test:e2e:jenkins'
      }
    }
  }
}
