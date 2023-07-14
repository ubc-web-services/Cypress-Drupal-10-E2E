import { doLogin } from "../helpers/helpers.cy.js"

describe('Generic Test Suite - Cron', () => {

    beforeEach((() => {
        cy.doLogin();
        cy.visit('admin/config/system/cron');
    }))

    it('can run cron with button', () => {
        cy.get('.page-title').contains('Cron');
        cy.get('.messages').should('not.exist');
        cy.get('#edit-run').click();
        cy.wait(5000);
        cy.get('.messages').contains('Cron ran successfully.');
    })
})