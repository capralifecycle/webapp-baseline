# Baseline for creating web apps

[![Build Status](https://jenkins.capra.tv/buildStatus/icon?job=cals-baselines/webapp-baseline/master)](https://jenkins.capra.tv/job/cals-baselines/job/webapp-baseline/job/master/)

# Developing

Developing locally is done with `webpack-dev-server` and is run on port 3000
Hot reload and history API fallback are enabled by default

```
$ npm start
```

# Building

```
$ npm run build
```

## Measure build performance

If the build process seems to be slower than it should you can run the following command to analyze where bottlenecks might occur.

```
$ npm run build:measure
```

## Analyzing bundle size

Performance budget has been enabled for the application. If you get warnings about bundle size when building you have exceeded the build size set by the budget. Consider use of code splitting or analyze your bundle with the following command

```
$ make analyze
```
