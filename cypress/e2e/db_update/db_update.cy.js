describe("Generic Test Suite - reports/updates", () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    })

    beforeEach(() => {
        // do something before each test
        cy.visit('/user/login')
        cy.get('#edit-name').type(Cypress.env('username'))
        cy.get('#edit-pass').type(Cypress.env('password'))
        cy.get('#edit-submit').click()

        cy.viewport(1440, 900)
    })

    it("checks whether database needs an update", () => {
        cy.visit('/update.php')
        cy.get('.button').click()
        cy.get('.messages__content').invoke('text').should('contain', "No pending updates.")
    })
})