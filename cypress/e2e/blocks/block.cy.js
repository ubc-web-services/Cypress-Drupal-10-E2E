describe('Generic Test Suite - Blocks', () => {

    // Override error on login page
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });

    beforeEach((() => {
        cy.visit('/');
        cy.visit('/user/login');
        cy.get('#edit-name').click().type(Cypress.env('username'))
        cy.get('#edit-pass').click().type(Cypress.env('password'), { log: false })
        cy.get('#edit-submit').click();
        cy.get('.toolbar-menu-administration').should('exist');
    }))

    it('add a block', () => {

        // ADD A BLOCK
        cy.visit('/block/add/basic');
        cy.get('#edit-info-0-value').click().type('CypressTestBlock123');
        cy.get('#edit-submit').click();
        cy.contains('.messages__content', 'Basic block').should('contain', 'has been created');
        cy.get('.chosen-container-single').click().within(() => {
            cy.get('li[data-option-array-index="1"]').click();
        });
        cy.get('#edit-actions-submit').click();

        // DELETE THE BLOCK
        cy.visit('/admin/structure/block/block-content');
        cy.get('tbody > :nth-child(1) > .views-field-info > a').contains('CypressTestBlock123').parent().parent().within(() => {
            cy.get('.dropbutton-toggle button').click()
            cy.get('.delete.dropbutton__item').click();
        })
        cy.get('#edit-submit').click();

        // VERIFY BLOCK IS DELETED
        cy.visit('/admin/config/development/configuration');
        cy.get('.messages-list__item').should('not.contain', 'block.block.CypressTestBlock123');
        // Tested with a block that is deleted and one that isn't, confirmed test works
    })
})