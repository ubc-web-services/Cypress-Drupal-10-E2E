import { doLogin } from "../helpers/helpers.cy.js"

describe('Generic Test Suite - Blocks', () => {
    

    beforeEach((() => {
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
    }))

    it('add a block', () => {

        // ADD A BLOCK
        cy.visit('/block/add/basic');
        cy.get('#edit-info-0-value').click().type('CypressTestBlock123');
        cy.get('#edit-submit').click();
        // cy.contains('.messages__content', 'Basic block').should('contain', 'has been created');
        // cy.get('#edit-region').select('Off Canvas Drawer');
        cy.get('#edit-actions-submit').click();

        // DELETE THE BLOCK
        cy.visit('/admin/structure/block/block-content');
        cy.get('tbody > :nth-child(1) > .views-field-info > a').contains('CypressTestBlock123').parent().parent().within(() => {
            cy.get('.dropbutton-wrapper > .dropbutton-widget > .dropbutton > .edit > a').click();})
            cy.get(':nth-child(2) > .tabs__link').click();
            cy.get('#edit-submit').click();

        // VERIFY BLOCK IS DELETED
        cy.get('.view-content').should('not.contain', 'CypressTestBlock123');
    })
})