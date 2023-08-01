import { doLogin } from "../helpers/helpers.cy.js"

describe("Does add page stuff", () => {
    
    beforeEach(() => {
        
        Cypress.on('uncaught:exception', (err, runnable) => {
            if (err.message.includes("Failed to execute 'observe' on 'IntersectionObserver'")) {
                return false
            }
            if (err.message.includes("drupalSettings is not defined")) {
                return false
            }
            if (err.message.includes("Drupal is not defined")) {
                return false
            }
            return true;
        })

        cy.doLogin();
        cy.visit('/node/add/ubc_page');
    })
    
    it("Tries to type in the different text boxes", () => {
        const bodyMessage = "This text goes in the body";
        const supportMessage = "This text doesn't go in the body";
        const titleMessage = "Title goes here";
        const summaryMessage = "Summary text goes here";

        cy.get('#edit-body-0-value').type(bodyMessage);
        cy.get('#edit-field-page-supporting-content-0-value').type(supportMessage);
        cy.get('#edit-title-0-value').type(titleMessage);
        cy.get('#edit-body-0-summary').type(summaryMessage);

        cy.get('#edit-body-0-value').should('have.value', bodyMessage);
        cy.get('#edit-field-page-supporting-content-0-value').should('have.value', supportMessage);
        cy.get('#edit-title-0-value').should('have.value', titleMessage);
        cy.get('#edit-body-0-summary').should('have.value', summaryMessage);
    })

    // it("Clicks the two columns button (INCOMPLETE)", () => {
    //     cy.wait(1000);
    //     cy.get('.js-form-item-body-0-value > .form-textarea-wrapper > .ck-editor > .ck-editor__top > .ck-sticky-panel > .ck-sticky-panel__content > .ck-toolbar > .ck-toolbar__items > .cke5-ubccolumnstwo-insert-button').click();
    // })
})