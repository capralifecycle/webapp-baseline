# Liflig baseline for web apps

## Development

```bash
npm start
```

## Building

```bash
npm run build
```

### Measure build performance

If the build process seems to be slower than it should you can run the
following command to analyze where bottlenecks might occur.

```bash
npm run build:measure
```

### Analyzing bundle size

Performance budget has been enabled for the application. If you get
warnings about bundle size when building you have exceeded the build
size set by the budget. Consider use of code splitting or analyze
your bundle with the following command

```bash
make analyze
```

## Deployment

The webapp in this repo is deployed with
https://github.com/capralifecycle/liflig-cdk-app-reference
to:

* https://d3olrvscdmdlu9.cloudfront.net (dev)
* https://d1wp8sqdbvpcjy.cloudfront.net (staging)
* https://dbi86dloe46pn.cloudfront.net (prod)

It is used as an example for pipeline. Note that the environment
detection relies on specific URLs and hence is not currently
working properly for these URLs.
