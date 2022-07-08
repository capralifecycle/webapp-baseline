import "./commands";

import type { RecurseDefaults } from "cypress-recurse";

// As plugin cypress-image-diff-js does not contain type definitions so we have added it manually here.
// Ref: https://github.com/uktrade/cypress-image-diff/issues/65
// / <reference types="cypress" />
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      /**
       * @param name The name of the snapshots that will be generated
       * @param testThreshold @default 0 A number between 0 and 1 that represents the allowed percentage of pixels that can be different between the two snapshots
       * @param retryOptions @default { limit: 0, timeout: Cypress.config('defaultCommandTimeout'), delay: Cypress.config('defaultCommandTimeout') / 5 }
       * @example cy.compareSnapshot('empty-canvas', 0.1)
       */
      compareSnapshot(
        name: string,
        testThreshold?: number,
        retryOptions?: typeof RecurseDefaults,
      ): Chainable<Element>;
    }
  }
}
