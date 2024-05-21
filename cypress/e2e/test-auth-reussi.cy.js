describe("Test Auth pass", () => {
    it("The url is ok", () => {
        cy.visit("https://preprod.backmarket.fr/fr-fr/register")
    });

    it("The type of the firstname is text", () =>{
        expect(cy.get("#firstname")).to.be.a('string')
    });

    it("The type of the lastname is text", () =>{
        expect(cy.get("#lastname")).to.be.a('string')
    });

    it("The type of the email is email", () =>{
        expect(cy.get("#signup-email")).to.be.an('email')
    });

    it("The type of the password is text", () =>{
        expect(cy.get("#signup-password")).to.be.a('string')
    });

    it("Clic on the button", () =>{
        cy.get("button").click()
    });
});