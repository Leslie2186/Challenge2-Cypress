describe("Test Inscription", () => {
    it("Inscription is ok", () => {
        cy.visit("https://preprod.backmarket.fr/fr-fr/register");
        cy.get("#firstName").click({force: true}).type("Toto");
        cy.get("#lastName").click({force: true}).type("Dupond");
        cy.get("#signup-email").click({force: true}).type("toto@dupond.com");
        cy.get("#signup-password").click({force: true}).type("1234Toto");
        cy.get('[data-qa="signup-submit-button"]').click({force: true});
    });

    it("Inscription is not ok", () => {
        cy.visit("https://preprod.backmarket.fr/fr-fr/register");
        cy.get("#firstName").click({force: true}).type("Roger");
        cy.get("#lastName").click({force: true}).type("");
        cy.get("#signup-email").click({force: true}).type("roger@Dupond.com");
        cy.get("#signup-password").click({force: true}).type("1234Roger");
        cy.get('[data-qa="signup-submit-button"]').click({force: true});
    });
});

describe("Test Authentification", () => {
    it("Auth is ok", () => {
        cy.visit("https://preprod.backmarket.fr/fr-fr/register");
        cy.get("#signup-email").click({force: true}).type("lilie@gmail.com");
        cy.get("#signup-password").click({force: true}).type("Lilie33!");
    });

});