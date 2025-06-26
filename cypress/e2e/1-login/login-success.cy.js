describe("Login Flow", () => {
  beforeEach(() => {
    cy.visit("https://recruitment-staging-queenbee.paradev.io");
    const checkModalPopUp = cy.contains(
      "Ketahui aroma yang cocok untuk kepribadianmu"
    );
    if (checkModalPopUp) {
      cy.get("section > header > svg > path").click({ force: true });
    }
  });

  it('should success process login when user login with valid credentials', () => {
    cy.get("a").contains(/masuk/i).click();
    cy.contains(/nomor hp/i).click();
    cy.fixture('user').then((user) => {
      cy.get('input[name="phone"]').type(user.phone);
      cy.get('input[name="password"]').type(user.password);
    })
    cy.contains("button", /masuk/i).click();
    cy.url().should("not.include", "/login");
    cy.contains(/khoerul/i);
  });
});
