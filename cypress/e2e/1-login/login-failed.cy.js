describe("Login Failed Flow", () => {
  beforeEach(() => {
    cy.visit("https://recruitment-staging-queenbee.paradev.io");
    const checkModalPopUp = cy.contains(
      "Ketahui aroma yang cocok untuk kepribadianmu"
    );
    if (checkModalPopUp) {
      cy.get("section > header > svg > path").click({ force: true });
    }
  });

  it("should show failed login information if user login with invalid credentials", () => {
    cy.get("a").contains(/masuk/i).click();
    cy.contains(/nomor hp/i).click();
    cy.fixture("user").then((user) => {
      cy.get('input[name="phone"]').type(user.phone);
      cy.get('input[name="password"]').type("wrongpassword");
    });
    cy.contains("button", /masuk/i).click();
    cy.contains(/Nomor telepon atau password salah/i);
  });

  it("should show user account has been locked if we login with wrong credentials more than available attemps", () => {
    cy.get("a").contains(/masuk/i).click();
    cy.contains(/nomor hp/i).click();
    cy.fixture("user").then((user) => {
      cy.get('input[name="phone"]').type(user.phone);
      cy.get('input[name="password"]').type("wrongpassword");
    });
    cy.contains("button", /masuk/i).click();
    cy.contains(/Nomor telepon atau password salah/i);
    
    for (let attempt = 1; attempt <= 5; attempt++) {
      cy.contains("button", /masuk/i).click();
    }

    cy.contains(/Akun Dikunci Sementara/i);
  });
})