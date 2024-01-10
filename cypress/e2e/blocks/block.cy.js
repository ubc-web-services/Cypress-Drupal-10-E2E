import { doLogin } from "../helpers/helpers.cy.js"

describe('Generic Test Suite - Blocks', () => {
    beforeEach((() => {
        cy.doLogin();
        cy.visit('/block/add/basic');
    }))

    it('adds a block', () => {
        // ADD A BLOCK
        cy.get('#edit-info-0-value').click().type('CypressTestBlock123');
        cy.get('#edit-submit').click();
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