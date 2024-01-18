import { doLogin } from "../helpers/helpers.cy.js"

describe("Generic Test Suite - reports/updates", () => {
    beforeEach(() => {
        cy.doLogin();
        cy.visit('/admin/reports/dblog');
    })

    it("Checks that the title loaded (fails if whitescreen)", () => {
        cy.get('#block-gin-page-title').should('contain', 'Recent log messages');
    })

    it("Checks for critical errors (should be none)", () => {
        cy.get('#edit_severity_chosen').click()
        // Choose option 'critical' TODO: better selector?
        cy.get('[data-option-array-index="2"]').click();
        cy.get('#edit-submit-watchdog').click();

        cy.get('.view-empty').should('contain', 'No log messages available');
    })
})