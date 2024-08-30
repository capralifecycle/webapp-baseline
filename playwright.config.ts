import {defineConfig, devices, PlaywrightTestConfig} from '@playwright/test'

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();
export const playwrightTestConfig: PlaywrightTestConfig = {
  testDir: './tests/e2e',
  snapshotDir: './snapshots/e2e',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'list',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.DOCKER_BASE_URL ?? 'http://127.0.0.1:3000',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {...devices['Desktop Chrome']},
    },

    {
      name: 'firefox',
      use: {...devices['Desktop Firefox']},
    },

    {
      name: 'webkit',
      use: {...devices['Desktop Safari']},
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: process.env.DOCKER_BASE_URL
    ? undefined
    : {
        command: process.env.CI ? 'npm run preview' : 'npm run start',
        url: 'http://127.0.0.1:3000',
        reuseExistingServer: true,
      },
}
/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig(playwrightTestConfig)
