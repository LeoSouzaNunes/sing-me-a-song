describe("Test app", () => {
    describe("Create recommendation.", () => {
        beforeEach(() => {
            cy.resetDatabase();
        });
        it("should create video recommendation, click on like and dislike", () => {
            const recommendation = {
                name: "Rosa morena",
                youtubeUrl: "https://www.youtube.com/watch?v=P4DWLag9c_Y",
            };

            cy.visit("http://localhost:3000/");

            cy.get("input[placeholder=Name]").type(recommendation.name);
            cy.get("input[placeholder='https://youtu.be/...']").type(
                recommendation.youtubeUrl
            );

            cy.intercept("POST", "/recommendations").as("postSong");
            cy.get("button").click();
            cy.wait("@postSong");
            cy.contains(recommendation.name).should("be.visible");

            cy.contains("0").should("be.visible");
            cy.get("#up").click();
            cy.contains("1").should("be.visible");
            cy.get("#down").click();
            cy.contains("0").should("be.visible");
        });

        it("should test top recommendations", () => {
            cy.createRecommendationsByAmount(3);

            cy.visit("http://localhost:3000/");
            cy.get("#top").click();
            cy.url().should("eq", "http://localhost:3000/top");
        });
    });
});
