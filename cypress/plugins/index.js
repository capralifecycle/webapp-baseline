/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/// <reference types="cypress" />

const browserify = require("@cypress/browserify-preprocessor");
const { initPlugin } = require("cypress-plugin-snapshots/plugin");

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  // Workaround for https://github.com/meinaart/cypress-plugin-snapshots/issues/143
  on(
    "file:preprocessor",
    browserify({
      typescript: require.resolve("typescript"),
    }),
  );

  initPlugin(on, config);
  return config;
};
