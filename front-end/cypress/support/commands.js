// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("resetDatabase", () => {
    cy.request("POST", "http://localhost:5000/reset-database").as(
        "resetDatabase"
    );
    cy.get("@resetDatabase").should((response) => {
        expect(response.status).to.eq(200);
    });
});

Cypress.Commands.add("createRecommendationsByAmount", (amount) => {
    const recommendationArray = [
        {
            name: "Rosa Morena",
            youtubeLink: "https://www.youtube.com/watch?v=P4DWLag9c_Y",
        },
        {
            name: "Águas de Março",
            youtubeLink: "https://www.youtube.com/watch?v=BnB1G63XvCQ",
        },
        {
            name: "Meu Lugar",
            youtubeLink: "https://www.youtube.com/watch?v=tSRdBFSvuKI",
        },
    ];

    for (let i = 0; i < amount; i++) {
        const element = recommendationArray[i];
        cy.request("POST", "http://localhost:5000/recommendations", element).as(
            "createRecommendation"
        );
        cy.get("@createRecommendation").should((response) => {
            expect(response.status).to.eq(201);
        });
    }
});
