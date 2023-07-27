import { doLogin } from "../helpers.js"

describe('Generic Test Suite - Text Formats', () => {

    // TODO: Can potentially move these to cypress.env.json
    // Variables to compare formats
    // ------------------------------------------------------------
    const textFormats = ["ckeditor5", "—"];             // allowed formats for CKEditor 5
    const textFormat9 = ["ckeditor5", "—", "CKEditor"]; // allowed formats for CKEditor 4
    // ------------------------------------------------------------

    beforeEach((() => {
        cy.doLogin();
        cy.get('.toolbar-menu-administration').should('exist');
        cy.visit('admin/config/content/formats');
    }))

    it('only allowed text formats?', () => {
        cy.get('.page-title').contains('Text formats and editors');
        cy.get('.messages').should('not.exist');
        
        cy.get('#edit-formats').within(() => {
          cy.get('tbody').within(() => {
            cy.get('td:nth-child(2)').each(($el, index, $list) => {
                const textEditorValue = $el.text();
              cy.log(textEditorValue);
              cy.wrap(textFormats).should('contain', textEditorValue);
            });
          });
        });
      });
})