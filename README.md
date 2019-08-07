# Baseline for creating web apps

[![Build Status](https://jenkins.capra.tv/buildStatus/icon?job=cals-baselines/webapp-baseline/master)](https://jenkins.capra.tv/job/cals-baselines/job/webapp-baseline/job/master/)

Technologies:

- React
- TypeScript
- Webpack
- Jest
- TestCafe
- TSLint
- Prettier
- Autoprefixer

## Using config-files for environment-specific configuration

The directory `/config` contains some JSON-files in which you can store configuration for you application. Webpack will copy the files from this folder to `/build/config` when you build your application. When deploying the application, please ensure that you include the configuration file for the environment you are deplying to.

**Example**

1. Your `/config/qa.json` file contains configurations for you application when running in the QA-environment
2. When deploying to QA. Also deploy `/build/qa.json` to the QA-environment (i.e. the same S3 bucket)

To access the configuration runtime you simply have to fetch the config using fetch, axios or similar (`GET /config.json`)
