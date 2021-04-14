# Liflig baseline for web apps

## Development

```bash
npm start
```

## Building

```bash
npm run build
```

## Testing

The project uses [Cypress](https://www.cypress.io/) for end-to-end testing.
Some of our Cypress tests verify screenshots. For this to work properly,
fonts must be exactly the same on the machine running Cypress as in the CI environment. The script `test-e2e-docker.sh` simulates this:

```bash
./test-e2e-docker.sh --update
```

The `--update` argument will cause failing image snapshots to be replaced.
Inspect the updated snapshot before commiting it.

To run tests in interactive mode (opens a browser window):

```bash
npm run test:e2e:open
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

- https://d3olrvscdmdlu9.cloudfront.net (dev)
- https://d1wp8sqdbvpcjy.cloudfront.net (staging)
- https://dbi86dloe46pn.cloudfront.net (prod)

It is used as an example for pipeline. Note that the environment
detection relies on specific URLs and hence is not currently
working properly for these URLs.
