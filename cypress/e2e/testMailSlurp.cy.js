describe("Test sur mailslurp", () => {
    it('can set config', () => {
        cy.mailslurp({ apiKey: '09b4d1795367d63c6e249085a55da3e2db56dcbba10a3fd882527ae8c347d458' })
    });

    it("Test boite mail avec mailslurp", () => {
         //Création d'une nouvelle instance de mailslurp
    cy.mailslurp().then(function (mailslurp) {

        //Création d'une nouvelle boite mail
        cy.then(() => mailslurp.createInbox())
            .then((inbox) => {
                //Sauvegarde de l'id et de l'adresse email 
                cy.wrap(inbox.id).as('inboxId');
                cy.wrap(inbox.emailAddress).as('emailAddress');
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