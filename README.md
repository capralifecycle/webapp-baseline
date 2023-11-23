# Liflig baseline for web apps
This project serves as a baseline when you wish to create a new webapp which is a single page application.

## Technologies
- **React** for components
- **Typescript** for type safety
- **React-router** for routing
- **Vitest** for unit testing and **Cypress** for visual testing
- **Vite** for bundling
- **Eslint** and **prettier** for linting
- **Renovate** for automatic updates of dependencies
- **Jenkins** for building and testing application for CI

## Checklist if using this baseline as a template

- [ ] Replace references to baseline in `README.md` and update with relevant project information
- [ ] Consider removing license from `package.json` and the file `LICENSE`
- [ ] Replace name and description in `package.json`
- [ ] Search code for `TODO` and replace as needed
- [ ] Remove irrelevant parts from this README (such as this section)

## Contributing

### Pre-commit checklist

All of these will be run as part of CI tests, so it is possible to save
some time by pushing and let the CI server try this out, and instead handle
any failure situations.

1. Lint check

   ```bash
   npm run lint
   ```

1. Test

   ```bash
   npm run test
   ```

1. Build

   ```bash
   npm run build
   ```

1. Run Cypress tests (see separate section for more details)

   ```bash
   ./test-cypress-docker.sh
   ```

### Running webapp locally

Install dependencies:

```bash
npm ci
# or use `npm install` if changing dependencies
```

Run the development server:

```bash
npm start
```

## Browser testing

The project uses [Cypress](https://www.cypress.io/) for browser testing.

Some of our Cypress tests verify screenshots. For this to work properly,
fonts must be exactly the same on the machine running Cypress as in
the CI environment. The script `test-cypress-docker.sh` simulates this:

```bash
./test-cypress-docker.sh --update
```

The `--update` argument will cause failing image snapshots to be replaced.
Inspect the updated snapshot before commiting it.

To run tests in interactive mode (opens a browser window):

```bash
npm run test:cypress:open
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
