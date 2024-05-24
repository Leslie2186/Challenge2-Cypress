describe("Test Inscription", () => {
    it("Inscription is ok", () => {
        cy.visit("https://preprod.backmarket.fr/fr-fr/register");
        cy.get("#firstName").click().type("Lilie33");
        cy.get("#lastName").click().type("Dupond");
        cy.get("#signup-email").click().type("lilie33@dupond.com");
        cy.get("#signup-password").click().type("1234Lilie33");
        cy.get("#newsletter").check({force:true});
        cy.get('[data-qa="signup-submit-button"]').click();
    });

    it("Inscription is not ok", () => {
        cy.visit("https://preprod.backmarket.fr/fr-fr/register");
        cy.get('[data-qa="signup-submit-button"]').click();
        cy.get("p.body-2-light").should('be.visible').and("contain.text", 'Le champ "Prénom" est obligatoire');
        cy.get("p.body-2-light").should('be.visible').and("contain.text", 'Le champ "Nom" est obligatoire');
        cy.get("p.body-2-light").should('be.visible').and("contain.text", 'Le champ "Email" est obligatoire');
        cy.get("p.body-2-light").should('be.visible').and("contain.text", 'Le champ mot de passe est obligatoire');
    });
});

describe("Test Authentification", () => {
    it("Auth is ok", () => {
        cy.visit("https://preprod.backmarket.fr/fr-fr/register");
        cy.get("#signup-email").click().type("lilie33@dupond.com");
        cy.get("#signup-password").click().type("1234Lilie33");
        cy.contains("Welcome Back!").click();
    });

});