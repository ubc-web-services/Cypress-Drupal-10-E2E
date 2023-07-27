Cypress.Commands.add('doLogin', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        if (err.message.includes("Failed to execute 'observe' on 'IntersectionObserver'")) {
            return false;
        }
    })

    cy.visit('/user/login');
    cy.get('#edit-name').click().type(Cypress.env('username'))
    cy.get('#edit-pass').click().type(Cypress.env('password'), { log: false })
    cy.get('#edit-submit').click();

    cy.viewport(1440, 900);
});

// Compare versions
//  - version: current version (string)
//  - minV: minimum version (array)
//  - maxV: maximum version (array)
Cypress.Commands.add('compareVersions', (version, minV, maxV) => {
    const int0 = version.split('.')[0];
    const int1 = version.split('.')[1];
    const int2 = version.split('.')[2];

    let equal = false;

    if ((
        (int0 > minV[0]) ||
        (int0 == minV[0] && int1 > minV[1]) ||
        (int0 == minV[0] && int1 == minV[1] && int2 >= minV[2])
    ) && (
            (int0 < maxV[0]) ||
            (int0 == maxV[0] && int1 < maxV[1]) ||
            (int0 == maxV[0] && int1 == maxV[1] && int2 <= maxV[2])
        )) {
        cy.log("Version " + version + " is within range (" + minV + " - " + maxV + ")");
        equal = true;
    } else {
        cy.log("Version " + version + " is not within range (" + minV + " - " + maxV + ")");
    }
    expect(equal).to.equal(true);
})