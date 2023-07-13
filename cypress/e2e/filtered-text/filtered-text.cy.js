describe('Generic Test Suite - Filtered Text', () => {

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
        cy.visit('admin/config/content/formats/manage/filtered_text');
    }))

    it('can access filtered text page & no errors', () => {
        cy.get('.page-title').contains('Filtered Text');
        cy.get('.messages').should('not.exist');
    })

    it('Anon and Auth users have no access to the text format', () => {
        cy.get('#edit-roles-anonymous').should('not.be.checked');
        cy.get('#edit-roles-authenticated').should('not.be.checked');
        cy.get('#edit-roles-anonymous').click();
        cy.get('#edit-roles-authenticated').click();
        cy.get('#edit-roles-anonymous').should('be.checked');
        cy.get('#edit-roles-authenticated').should('be.checked');
        // TODO: Check if this is ok to do
        // EXIT WITHOUT SAVING
    })

    it('Text format is set to CKEditor5', () => {
        cy.get('#edit_editor_editor_chosen > .chosen-single > :nth-child(1)').should('have.text', 'CKEditor5');
    })

    it('Styles are configured', () => {
        cy.get('#edit-editor-settings-plugins-stylescombo-styles').should('not.be.empty');
        // Tested with empty and non-empty values, confirmed test works
    })

    it('Link styles are configured', () => {
        // TODO
    })

    it('Linkit profile is set', () => {
        // TODO: Check if test is thorough enough
        cy.get('#edit-filters-linkit-status').should('be.checked');
        cy.get('#edit-filters-linkit-status').click();
        cy.get('#edit-filters-linkit-status').should('not.be.checked');
        cy.get('#edit-filters-linkit-status').click();

        cy.get('[data-drupal-selector="edit-linkit"] > .tabledrag-cell').should('have.text', 'Linkit URL converter');

        cy.get('strong.vertical-tabs__menu-item-title').contains('Linkit URL converter').click();
        cy.get('#edit-filters-linkit-settings-title').should('be.checked');
    })

    it('Track images uploaded via a text editor is enabled', () => {
        cy.get('#edit-filters-editor-file-reference-status').should('be.checked');
    })

    it('Lazy load images is enabled', () => {
        // TODO
    })

    it('Button link styles is disabled', () => {
        cy.get('#edit-filters-editor-button-link-filter-status').should('not.be.checked');
    })
})