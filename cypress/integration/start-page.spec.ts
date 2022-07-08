describe("start page", () => {
  it("should look similar as last time", () => {
    cy.visit("/");

    // Maybe we can improve waiting for fonts? This is a bit hacky.
    cy.wait(1000);
    cy.document().its("fonts.status").should("equal", "loaded");

    cy.get("#version-info")
      .first()
      .then((obj) => {
        obj.text("cypress snapshot");
      });

    cy.compareSnapshot(Cypress.currentTest.title);
  });
});
