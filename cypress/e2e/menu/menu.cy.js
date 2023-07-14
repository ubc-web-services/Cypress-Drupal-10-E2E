import { doLogin } from "../helpers/helpers.cy.js"

describe('Generic Test Suite - Menu', () => {

    beforeEach((() => {
        cy.doLogin();
    }))

    it('can access menu page', () => {
        cy.visit('admin/structure/menu/manage/main');
        cy.get('.page-title').contains('Edit menu Main menu');
    })

    it('assert no errors', () => {
        cy.visit('admin/structure/menu/manage/main');
        cy.get('.page-title').contains('Edit menu Main menu');
        cy.get('.messages').should('not.exist');
    })

    it('can access menu list', () => {
        cy.visit('admin/structure/menu');
        cy.get('.page-title').contains('Menus');
    })

    it('assert no errors', () => {
        cy.visit('admin/structure/menu');
        cy.get('.page-title').contains('Menus');
        cy.get('.messages').should('not.exist');
    })
})