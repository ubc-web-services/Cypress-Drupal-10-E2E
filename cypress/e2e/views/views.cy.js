describe('Generic Test Suite - Views Editing', () => {
    
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

    // Useful checks (looks for error/warning messages)
    // cy.get('.messages--error').should('not.exist') 
    // cy.get('.messages--warning').should('not.exist')

    it('finds content_items view and clicks on it', () => {

        cy.visit('/admin/structure/views')

        // Check for any errors/warnings
        cy.get('.messages--error').should('not.exist') 
        cy.get('.messages--warning').should('not.exist')
        
        // Find the content_items row from the search bar  
        cy.get('.views-filter-text').type('content_items')

        // Select the 'content_items' row
        const content_items = cy.get('tr.views-ui-list-enabled ').not('[style*="display: none"]')

        // Click on the edit button for 'content_items'
        content_items.children('.views-ui-view-operations')
                    .children('.dropbutton-wrapper')
                    .children('.dropbutton-widget')
                    .children('.dropbutton')
                    .children('.edit')
                    .children('a')
                    .click()

        cy.get('.messages--error').should('not.exist') 
        // include not js-hide to ignore invisible 'Unsaved Changes' warning
        cy.get('.messages--warning').not('.js-hide').should('not.exist')
    })

    it('edits view_contents name but cancels the edit', () => {
        
        cy.visit('/admin/structure/views/view/content_items')

        cy.get('.edit-details > .views-ajax-link').click()
        cy.get('.js-form-item-label > [id^=edit-label--]').clear().type('HELLO WORLD')

        // click cancel
        cy.get('.ui-dialog-buttonset > :nth-child(2)').click()
        
        cy.get('.messages--error').should('not.exist') 
        // NOTE: include not js-hide to ignore invisible 'Unsaved Changes' warning 
        cy.get('.messages--warning').not('.js-hide').should('not.exist')
    })

    it('attempts to create a view using a name already in use, checks for errors', () => {

        cy.visit('/admin/structure/views')

        // Click 'Add view'
        cy.get('.button').click()
        
        // Attempt to create a view using a name already in use
        cy.get('#edit-label').type("Content")   // TODO: is "Content" consistent across sites?
        cy.get('#edit-submit').click()
        cy.get('#edit-id').type("content")
        cy.get('#edit-submit').click()

        cy.get('.messages--error').should('exist')
    })

    it('Makes an edit, checks for unsaved changes warning, cancels edit', () => {
        
        cy.visit('/admin/structure/views/view/content_items')

        // Edit view title
        cy.get('.edit-details > .views-ajax-link').click()
        cy.get('.js-form-item-label > [id^=edit-label--]').clear().type('HELLO WORLD')
        cy.get('.ui-dialog-buttonset > :nth-child(1)').click()

        cy.get('.messages--warning').not('.js-hide').should('exist')    // unsaved changes warning 

        // Check that the page title was changed
        cy.get('.page-title').contains('HELLO WORLD')
        
        cy.get('#edit-actions-cancel').click()
        // Check that the edit made doesn't exist anymore
        cy.visit('/admin/structure/views/view/content_items')
        cy.get('.page-title').contains('HELLO WORLD').should('not.exist')
    })
})
