import { doLogin } from "../helpers/helpers.cy.js"

describe('Generic Test Suite - Cron', () => {

    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    })

    beforeEach((() => {
        cy.doLogin();
        cy.visit('admin/config/system/cron');
    }))

    it('can run cron with button', () => {
        cy.get('.page-title').contains('Cron');
        // cy.get('.messages').should('not.exist');     // TODO: sometimes errors show up but we still wanna run the test
        cy.get('#edit-run').click();
        // cy.wait(5000);
        // // Message may not be visible on local environment
        //cy.get('.messages').contains('Cron ran successfully.');
        cy.visit('admin/reports/dblog');
        cy.contains('td.views-field.views-field-message a', 'Cron run completed.', { first: true });
    })
})