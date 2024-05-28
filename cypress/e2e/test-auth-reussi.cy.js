let userDatas = require("../fixtures/datas.json");
let adresseEmail = "bd8fba81-6958-4ebe-891f-9b40b443af44@mailslurp.net";
let motDePasse = "QjopAZOxFM25PXOelhOFe5mPJbtHuKOi";


describe("Test sur mailslurp", () => {
    it('can set config', () => {
        cy.mailslurp({ apiKey: '09b4d1795367d63c6e249085a55da3e2db56dcbba10a3fd882527ae8c347d458' })
    });

    it.skip("Test boite mail avec mailslurp", () => {
         //Création d'une nouvelle instance de mailslurp
    cy.mailslurp().then(function (mailslurp) {

        //Création d'une nouvelle boite mail
        cy.then(() => mailslurp.createInbox())
            .then((inbox) => {
                //Sauvegarde de l'id et de l'adresse email 
                cy.wrap(inbox.id).as('inboxId');
                cy.wrap(inbox.emailAddress).as('emailAddress');
                cy.wrap(inbox.password).as('password');
                adresseEmail = inbox.emailAddress;
                motDePasse = inbox.password;
            })

        //Envoi d'un email
        cy.mailslurp()
        .then(() => mailslurp.sendEmail(this.inboxId, {
            to: [this.emailAddress  ],
            subject: 'Bonjour email de confirmation',
            body: 'Voilà votre code: ABC-123',
        }))

        //Attente de la confirmation de l'eamil
        cy.then({
            timeout: 60_000
        }, function () {
            return mailslurp
                //Attente de l'email qui arrive dans la boite
                .waitForLatestEmail(this.inboxId, 60_000, true)
                // extract the code with a pattern
                .then(email => mailslurp.emailController.getEmailContentMatch({
                    emailId: email.id,
                    contentMatchOptions: {
                        //Extraction du code et vérification avec une regex
                        pattern: 'Your Demo verification code is ([0-9]{6})'
                    }
                }))
                //Sauvegarde du code de vérification
                .then(({matches}) => cy.wrap(matches[1]).as('verificationCode'))
        });

        /*//Confirmer l'utilisateur avec le code de vérification
        cy.then(function () {
            cy.get('[name=code]').type(this.verificationCode)
            cy.get('[data-test=confirm-sign-up-confirm-button]').click()
            //Utilisation de l'email et du password
            cy.get('[data-test=username-input]').type(this.emailAddress)
            cy.get('[data-test=sign-in-password-input]').type('test-password')
            //Clique sur le bouton de soumission
            return cy.get('[data-test=sign-in-sign-in-button]').click();
        })
        cy.get('h1').should('contain', 'Welcome');*/
    });
    });
});

describe("Test Inscription", () => {
    it("Inscription is ok", () => {
        cy.visit("https://preprod.backmarket.fr/fr-fr/register");
        cy.wait(2000);
        cy.get("#firstName").click().type(userDatas.firstname);
        cy.get("#lastName").click().type(userDatas.lastname);
        cy.get("#signup-email").click().type(adresseEmail);
        cy.get("#signup-password").click().type(motDePasse);
        cy.get("#newsletter").check({force:true});
        cy.get('[data-qa="signup-submit-button"]').click();
    });

    it.skip("Inscription is not ok", () => {
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
        cy.wait(3000);
        cy.get("#signup-email").click().type(adresseEmail);
        cy.get("#signup-password").click().type(motDePasse);
        cy.contains("Welcome Back!").click();
    });

});

describe("Test réinitialisation du mot de passe", () => {
    it("Demande de réinitialisation du mot de passe", () => {
        cy.visit("https://preprod.backmarket.fr/fr-fr/register");
        cy.get('[href="/fr-fr/password-reset"]').click();
        cy.url().should('eq', "https://preprod.backmarket.fr/fr-fr/password-reset");
        cy.url().should('include',"password-reset");
        cy.wait(2000);
        cy.get("#email").type(adresseEmail);
        cy.get('[data-qa="password-reset-submit-button"]').click();
        cy.wait(2000);
        cy.url().should('eq',"https://preprod.backmarket.fr/fr-fr/password-reset/confirm");
        cy.url().should('include',"password-reset/confirm");
        cy.get("span.title-1").should('be.visible').and("contain.text", "Wouhou !");
        cy.screenshot('reinitilisation_ok');
    })
});