import { compareVersions } from "../helpers/helpers.cy.js"
import { doLogin } from "../helpers/helpers.cy.js"

describe('Generic Test Suite - Status Page', () => {

    // TODO: Can potentially move these to cypress.env.json
    // Variables to compare versions
    // ------------------------------------------------------------
    const minDrupalVersion = [9, 5, 0];     // Drupal version 9.5.0
    const maxDrupalVersion = [10, 4, 4];    // Drupal version 10.4.4
    const minPHPVersion = [8, 1, 0];        // PHP version 8.1.0
    const maxPHPVersion = [8, 2, 0];        // PHP version 8.5.0
    // ------------------------------------------------------------

    beforeEach((() => {
        cy.doLogin();
        cy.visit('admin/reports/status');
    }))

    it('can access status page', () => {
        cy.get('.page-title').contains('Status report');
    })

    it('Is Drupal version within range)', () => {
        cy.get('.page-title').contains('Status report');
        cy.get('.messages').should('not.exist');
        cy.get('.system-status-general-info__items > :nth-child(1) > :nth-child(2)').then(($version) => {
            const version = $version.text().split('Version')[1];
            cy.compareVersions(version, minDrupalVersion, maxDrupalVersion);
        })
    })

    it('Is PHP version within range', () => {
        cy.get('.page-title').contains('Status report');
        cy.get('.messages').should('not.exist');
        cy.get('.system-status-general-info__items > :nth-child(4) > :nth-child(2)').then(($version) => {
            const version = $version.text().match(/\d+\.\d+\.\d+/g)[0];
            cy.compareVersions(version, minPHPVersion, maxPHPVersion);
        })
    })

    it('Are there Errors found (list?)', () => {
        cy.get(':nth-child(1) > .system-status-counter > .system-status-counter__status-title > .system-status-counter__title-count').then(($errors) => {
            const errors = $errors.text();
            const numErrors = parseInt(errors);
            cy.log("Errors found: " + numErrors + " errors found");
            expect(numErrors).to.equal('0');
        })
    })

    it('Are there Warnings found (list?)', () => {
        cy.get(':nth-child(2) > .system-status-counter > .system-status-counter__status-title > .system-status-counter__title-count').then(($warnings) => {
            const warnings = $warnings.text();
            const numWarnings = parseInt(warnings);
            cy.log("Warnings found: " + numWarnings + " warnings found");
            expect(numWarnings).to.equal(0);
        })
    })

    it('Is PHP APCu enabled', () => {
        cy.get('.system-status-report__row')
            .contains('.system-status-report__status-title', 'PHP APCu caching')
            .parent().within(() => {
                cy.get('.system-status-report__entry__value').then(($value) => {
                    const text = $value.text().trim();
                    cy.log(text);
                    expect(text).to.match(/^Enabled/);
                })
            })
    })
})