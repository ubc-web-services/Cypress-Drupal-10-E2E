describe("Checks for ckeditor widget stuff", () => {
    
    beforeEach(() => {
        
        Cypress.on('uncaught:exception', (err, runnable) => {
            if (err.message.includes("Failed to execute 'observe' on 'IntersectionObserver'")) {
                return false
            }
            return true;
        })
        cy.visit('/user/login')
        cy.get('#edit-name').type(Cypress.env('username'))
        cy.get('#edit-pass').type(Cypress.env('password'))
        cy.get('#edit-submit').click()

        cy.viewport(1440, 900)
    })

    it("Checks whether ckeditor widgets have any configuration at all", () => {
        cy.visit('/admin/config/content/ubc-ckeditor-widgets');
        // check whether text boxes are empty (NOTE: I'm aware that the following code is repetitive, but 
        // I don't know how to make a for loop for this!!!)
        cy.get('#edit-background-colors').should('not.be.empty');     
        cy.get('#edit-padding-styles').should('not.be.empty');         
        cy.get('#edit-margin-styles').should('not.be.empty');          
        cy.get('#edit-gap-styles').should('not.be.empty');     
        cy.get('#edit-table-styles').should('not.be.empty');     
        cy.get('#edit-three-column-layout-styles').should('not.be.empty');     
        cy.get('#edit-two-column-layout-styles').should('not.be.empty');     
        cy.get('#edit-width-styles').should('not.be.empty');     
    })

    it("Checks that the background color configuration is correct", () => {
        cy.visit('/admin/config/content/ubc-ckeditor-widgets');

        // Check to see whether text box contains all necessary configuration (Case sensitive, order insensitive)
        cy.get('#edit-background-colors').should(($ebc) => {
            expect($ebc).to.contain('bg-transparent\|None');
            expect($ebc).to.contain('bg-white\|White');
            expect($ebc).to.contain('bg-grey-100\|Light Grey');
            expect($ebc).to.contain('bg-unit-primary\|Unit Primary');
            expect($ebc).to.contain('bg-unit-secondary\|Unit Secondary');
            expect($ebc).to.contain('bg-unit-tertiary\|Unit Tertiary');
            expect($ebc).to.contain('bg-unit-accent\|Unit Accent');
            expect($ebc).to.contain('bg-ubc-blue\|UBC Blue');
            expect($ebc).to.contain('bg-ubc-blue-sea\|UBC Blue Sea');
            expect($ebc).to.contain('bg-ubc-blue-cobalt\|UBC Blue Cobalt');
            expect($ebc).to.contain('bg-ubc-blue-neptune\|UBC Blue Neptune');
            expect($ebc).to.contain('bg-ubc-blue-cornflower\|UBC Blue Cornflower');
            expect($ebc).to.contain('bg-ubc-blue-polar\|UBC Blue Polar');
            expect($ebc).to.contain('bg-ubc-blue-frost\|UBC Blue Frost');
        })
    })

    it("Checks padding styles", () => {
        cy.visit('/admin/config/content/ubc-ckeditor-widgets');

        cy.get('#edit-padding-styles').should(($eps) => {
            expect($eps).to.contain('p-0\|None');
            expect($eps).to.contain('p-4\|Small');
            expect($eps).to.contain('p-6\|Normal');
            expect($eps).to.contain('p-12\|Large');
            expect($eps).to.contain('p-16\|Extra Large');
        })
    })
    
    it("Checks margin styles", () => {
        cy.visit('/admin/config/content/ubc-ckeditor-widgets');

        cy.get('#edit-margin-styles').should(($egs) => {
            expect($egs).to.contain('my-0\|None');
            expect($egs).to.contain('my-4\|Small');
            expect($egs).to.contain('my-6\|Normal');
            expect($egs).to.contain('my-12\|Large');
            expect($egs).to.contain('my-16\|Extra Large');
        })
    })

    it("Checks gap styles", () => {
        cy.visit('/admin/config/content/ubc-ckeditor-widgets');

        cy.get('#edit-gap-styles').should(($ems) => {
            expect($ems).to.contain('gap-0\|None');
            expect($ems).to.contain('gap-4\|Small');
            expect($ems).to.contain('gap-6\|Normal');
            expect($ems).to.contain('gap-12\|Large');
            expect($ems).to.contain('gap-16\|Extra Large');
        })
    })

    it("Checks table styles", () => {
        cy.visit('/admin/config/content/ubc-ckeditor-widgets');

        cy.get('#edit-table-styles').should(($ets) => {
            expect($ets).to.contain('table--nostyle\|None');
            expect($ets).to.contain('table--plain\|Plain');
            expect($ets).to.contain('table--condensed\|Condensed');
            expect($ets).to.contain('table--striped\|Striped');
            expect($ets).to.contain('table--hover\|Stripe on hover');
        })
    })

    it("Checks three column layout styles", () => {
        cy.visit('/admin/config/content/ubc-ckeditor-widgets');

        cy.get('#edit-three-column-layout-styles').should(($etcls) => {
            expect($etcls).to.contain('align-equal\|Equal Width');
            expect($etcls).to.contain('align-large-left\|Align Large Left');
            expect($etcls).to.contain('align-large-center\|Align Large Center');
            expect($etcls).to.contain('align-large-right\|Align Large Right');
        })
    })

    it("Checks two column layout styles", () => {
        cy.visit('/admin/config/content/ubc-ckeditor-widgets');

        cy.get('#edit-two-column-layout-styles').should(($etcls) => {
            expect($etcls).to.contain('align-equal\|Equal Width');
            expect($etcls).to.contain('align-large-left\|Align Large Left');
            expect($etcls).to.contain('align-large-right\|Align Large Right');
        })
    })

    it("Checks width styles", () => {
        cy.visit('/admin/config/content/ubc-ckeditor-widgets');

        cy.get('#edit-width-styles').should(($ews) => {
            expect($ews).to.contain('w-auto\|Column width: Auto');
            expect($ews).to.contain('w-half\|Column width: 1/2');
            expect($ews).to.contain('w-one-third\|Column width: 1/3');
            expect($ews).to.contain('w-one-quarter\|Column width: 1/4');
            expect($ews).to.contain('w-one-fifth\|Column width: 1/5');
            expect($ews).to.contain('w-one-sixth\|Column width: 1/6');
        })
    })
})