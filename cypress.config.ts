/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { defineConfig } from "cypress";

import getCompareSnapshotsPlugin from "cypress-image-diff-js/dist/plugin";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    specPattern: "cypress/integration/**/*.spec.ts",
    excludeSpecPattern: ["**/__snapshots__/*", "**/__image_snapshots__/*"],
    supportFile: "cypress/support/index.ts",
    scrollBehavior: "nearest",
    setupNodeEvents(on, config) {
      // `on` is used to hook into various events Cypress emits
      // `config` is the resolved Cypress config

      getCompareSnapshotsPlugin(on, config);
      return config;
    },
  },
});
