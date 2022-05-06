describe("Test app", () => {
    describe("Create recommendation.", () => {
        it("should create video recommendation.", () => {
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
        });
    });
});
