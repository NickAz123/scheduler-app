describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });

  it("should navigate to tuesday", () => {
    cy.visit("/");

    cy.contains("[data-testid=day]", "Tuesday").click().get(".day-list__item--selected");
  })
});