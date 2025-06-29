describe("Order Flow", () => {
  beforeEach(() => {
    cy.visit("https://recruitment-staging-queenbee.paradev.io");
    const checkModalPopUp = cy.contains(/Ketahui aroma yang cocok untuk kepribadianmu/i);
    if (checkModalPopUp) {
      cy.get("section > header > svg > path").click({ force: true });
    }
    const checkCookies = cy.contains("button", /izinkan semua cookies/i);
    if (checkCookies) {
      checkCookies.click({force: true});
    }
  });

  it("should success order flow from cart", () => {
    cy.get("a").contains(/masuk/i).click();
    cy.contains(/nomor hp/i).click();
    cy.fixture("user").then((user) => {
      cy.get('input[name="phone"]').type(user.phone);
      cy.get('input[name="password"]').type(user.password);
    });
    cy.contains("button", /masuk/i).click();
    cy.url().should("not.include", "/login");
    cy.contains(/khoerul/i);
    cy.get('[class*="HeaderQbee_total-cart_"]').click();
    cy.get('input[type="checkbox"].chakra-checkbox__input').check({force: true});
    cy.contains("button", /beli sekarang/i).click();
    cy.contains(/Total pembayaran/i).should("be.visible");
    cy.contains(/pilih layanan pengiriman/i).click();
    cy.get('input[type="radio"][name="delivery-opt"]').first().check();
    cy.get("[class*=pickCourier_courier-container_").first().click();
    cy.contains("button", /pilih pembayaran/i).click();
    cy.contains(/pesanan berhasil dipesan/i);
  });

  it("should success order flow from add to cart, then access the cart and process the order", () => {
    cy.get("a").contains(/masuk/i).click();
    cy.contains(/nomor hp/i).click();
    cy.fixture("user").then((user) => {
      cy.get('input[name="phone"]').type(user.phone);
      cy.get('input[name="password"]').type(user.password);
    });
    cy.contains("button", /masuk/i).click();
    cy.url().should("not.include", "/login");
    cy.contains(/khoerul/i);
    cy.contains("button", /keranjang/i).first().click();
    cy.get('[class*="HeaderQbee_total-cart_"]').click();
    cy.get('input[type="checkbox"].chakra-checkbox__input').check({force: true});
    cy.contains("button", /beli sekarang/i).click();
    cy.contains(/Total pembayaran/i).should("be.visible");
    cy.contains(/pilih layanan pengiriman/i).click();
    cy.get('input[type="radio"][name="delivery-opt"]').first().check();
    cy.get("[class*=pickCourier_courier-container_").first().click();
    cy.contains("button", /pilih pembayaran/i).click();
    cy.contains(/pesanan berhasil dipesan/i);
  });
});
