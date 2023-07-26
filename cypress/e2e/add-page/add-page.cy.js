describe("Does add page stuff", () => {
    
    beforeEach(() => {
        
        Cypress.on('uncaught:exception', (err, runnable) => {
            if (err.message.includes("Failed to execute 'observe' on 'IntersectionObserver'")) {
                return false
            }
            return true;
        })

        cy.visit('/user/login')
        cy.get('#edit-name').type(Cypress.env('username'))
        cy.get('#edit-pass').type(Cypress.env('password'))
        cy.get('#edit-submit').click()

        cy.viewport(1440, 900);

        cy.visit('/node/add/ubc_page');
    })
    
    it("Tries to type in the different text boxes", () => {
        const bodyMessage = "This text goes in the body";
        const supportMessage = "This text doesn't go in the body";
        const titleMessage = "Title goes here";
        const summaryMessage = "Summary text goes here";

        // Type in body textbox
        cy.get('.form-item--body-0-value .ck-editor__main > .ck-editor__editable').then(el => {
            const editor = el[0].ckeditorInstance;
            editor.setData(bodyMessage);
        })

        // Type in supporting content textbox
        cy.get('.form-item--field-page-supporting-content-0-value .ck-editor__main > .ck-editor__editable').then(el => {
            const editor = el[0].ckeditorInstance;
            editor.setData(supportMessage);
        })

        cy.get('#edit-title-0-value').type(titleMessage);
        cy.get('#edit-body-0-summary').type(summaryMessage);

        cy.get('.form-item--body-0-value .ck-editor__main').should('contain', bodyMessage);
        cy.get('.form-item--field-page-supporting-content-0-value .ck-editor__main').should('contain', supportMessage);
        cy.get('#edit-title-0-value').should('have.value', titleMessage);
        cy.get('#edit-body-0-summary').should('have.value', summaryMessage);
    })

    it("Clicks the two columns button (INCOMPLETE)", () => {
        cy.wait(1000);
        cy.get('.js-form-item-body-0-value > .form-textarea-wrapper > .ck-editor > .ck-editor__top > .ck-sticky-panel > .ck-sticky-panel__content > .ck-toolbar > .ck-toolbar__items > .cke5-ubccolumnstwo-insert-button').click();
    })
})