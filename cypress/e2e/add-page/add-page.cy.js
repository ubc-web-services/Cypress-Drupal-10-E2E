import { doLogin } from "../helpers/helpers.cy.js"

describe("Does add page stuff", {testIsolation: false}, () => {
    
    beforeEach(() => {
        cy.doLogin();
        cy.visit('/node/add/ubc_page');
    })

    it("Types in the title and summary boxes", () => {
        const titleMessage = "Title goes here";
        const summaryMessage = "Summary text goes here";

        cy.get('.form-item--title-0-value > input').type(titleMessage).should('have.value', titleMessage);
        cy.get('#edit-body-0-summary').type(summaryMessage).should('have.value', summaryMessage);
    })

    it("Tries to type in the body text box", () => {
        const bodyMessage = "This text goes in the body";

        // Gotta grab the ckeditor using this method (get the actual div that contains <p>)
        cy.get('.ck-editor__main > .ck-editor__editable').then(el => {
            const editor = el[0].ckeditorInstance;
            editor.setData(bodyMessage);
            // TODO: how to assert that the body element was typed inside?
        })        
    })

    // TODO: look at  "How to find all specific elements in the editor?"
    it("Inserts two columns widget", () => {
        // Spawns in the two columns widget
        cy.get('.cke5-ubccolumnstwo-insert-button .ck-icon').click()

        // Interacts with the two columns widget (TODO: implement this properly)

        
        // cy.get('.ck-editor__main > .ck-editor__editable').then(el => {
        //     const editor = el[0].ckeditorInstance;
        //     editor.model.change( writer => {
                // const insertPosition = editor.model.document.selection.getSelectedElement();
                // const text = writer.createText( 'foo' );
                // writer.insert( text, insertPosition, 0 );

                // const more_text = writer.createText('bar');
                // writer.insert( more_text, insertPosition.nodeAfter, 0);

                // const range = editor.model.createRangeIn( editor.model.document.getRoot() );

                // for ( const value of range.getWalker() ) {
                //     cy.log(value);
                // }
        //     } );
        // })
    })

    it("Inserts three columns widget", () => {
        cy.get('.cke5-ubccolumnsthree-insert-button .ck-icon').click()
    })

    it("Inserts four columns widget", () => {
        cy.get('.cke5-ubccolumnsfour-insert-button .ck-icon').click()
    })

    it("Inserts an accordian toggle", () => {
        cy.get('.cke5-ubcaccordiontoggle-insert-button').click()
    })

    it("Inserts an accordian", () => {
        cy.get('.cke5-ubcaccordion-insert-button').click()
    })

    it("Inserts a horizontal card", () => {
        cy.get('.cke5-ubccardhorizontal-insert-button').click()
    })

    it("Inserts a vertical card", () => {
        cy.get('.cke5-ubccardverticalone-insert-button').click()
    })

    it("Inserts two vertical cards", () => {
        cy.get('.cke5-ubccardverticaltwo-insert-button').click()
    })

    it("Inserts three vertical cards", () => {
        cy.get('.cke5-ubccardverticalthree-insert-button').click()
    })
})