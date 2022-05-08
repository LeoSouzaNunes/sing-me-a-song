import app from "../src/app.js";
import supertest from "supertest";
import { prisma } from "../src/database.js";
import recommendationFactory from "./factories/recommendationFactory.js";

describe("App integration tests", () => {
    beforeEach(async () => {
        await prisma.$queryRaw`TRUNCATE TABLE recommendations`;
    });
    afterAll(async () => {
        await prisma.$disconnect();
    });

    describe("POST /recommendations", () => {
        it("should create a recommendation given valid input", async () => {
            const body = recommendationFactory.returnRecommendationBody();
            const response = await supertest(app)
                .post("/recommendations")
                .send(body);
            const recommendation = await recommendationFactory.findUniqueByName(
                body.name
            );

            expect(response.status).toEqual(201);
            expect(recommendation).not.toEqual(null);
        });

        it("shouldn't create a recommendation given invalid input", async () => {
            const response = await supertest(app)
                .post("/recommendations")
                .send({});

            expect(response.status).toEqual(422);
        });
    });

    describe("POST /recommendations/:id/upvote and /downvote", () => {
        it("should increase the score column given a valid recommendation id", async () => {
            const id = await recommendationFactory.createRecommendation();

            const response = await supertest(app).post(
                `/recommendations/${id}/upvote`
            );

            const recommendation = await recommendationFactory.findUniqueById(
                id
            );

            expect(response.status).toEqual(200);
            expect(recommendation.score).toEqual(1);
        });

        it("should decrease the score column given a valid recommendation id", async () => {
            const id = await recommendationFactory.createRecommendation();

            const response = await supertest(app).post(
                `/recommendations/${id}/downvote`
            );

            const recommendation = await recommendationFactory.findUniqueById(
                id
            );

            expect(response.status).toEqual(200);
            expect(recommendation.score).toEqual(-1);
        });

        it("should delete the recommendation after score less than -5", async () => {
            const id = await recommendationFactory.createRecommendation();

            for (let i = 0; i <= 5; i++) {
                await supertest(app).post(`/recommendations/${id}/downvote`);
            }

            const recommendation = await recommendationFactory.findUniqueById(
                id
            );

            expect(recommendation).toEqual(null);
        });
    });

    describe("GET /recommendations", () => {
        it("should get an array with 10 recommendations", async () => {
            await recommendationFactory.createRandomRecommendationSample(11);
            const response = await supertest(app).get("/recommendations");
            expect(response.body.length).toEqual(10);
        });
    });

    describe("GET /recommendations/:id", () => {
        it("should get recommendation by id", async () => {
            const id = await recommendationFactory.createRecommendation();
            const response = await supertest(app).get(`/recommendations/${id}`);

            expect(response.body).not.toEqual(null);
        });
    });

    describe("GET /recommendations/random", () => {
        it("should return status code 404", async () => {
            const response = await supertest(app).get(
                "/recommendations/random"
            );
            expect(response.status).toEqual(404);
        });
        it("should return a random recommendation", async () => {
            await recommendationFactory.createRandomRecommendationSample(5);
            const response = await supertest(app).get(
                "/recommendations/random"
            );
            expect(response.body).not.toEqual(null);
        });
    });

    describe("GET /recommendations/top/:amount", () => {
        it("should return top recommendations given a limit", async () => {
            const topScore = 100;
            const createAmount = 5;
            const getAmount = 3;
            await recommendationFactory.createRecommendationsWithScore(
                createAmount,
                topScore
            );
            const response = await supertest(app).get(
                `/recommendations/top/${getAmount}`
            );

            expect(response.body.length).toEqual(getAmount);
            expect(response.body[0].score).toEqual(topScore);
        });
    });
});
