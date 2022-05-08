import { prisma } from "../../src/database.js";
import { faker } from "@faker-js/faker";

function returnRecommendationBody() {
    return {
        name: "Rosa morena",
        youtubeLink: "https://www.youtube.com/watch?v=P4DWLag9c_Y",
    };
}

async function createRecommendation() {
    const body = returnRecommendationBody();
    const { id } = await prisma.recommendation.create({
        data: body,
        select: {
            id: true,
        },
    });
    return id;
}

async function findUniqueByName(name: string) {
    const recommendation = await prisma.recommendation.findUnique({
        where: { name: name },
    });

    return recommendation;
}

async function findUniqueById(id: number) {
    const recommendation = await prisma.recommendation.findUnique({
        where: { id },
    });

    return recommendation;
}

async function createRandomRecommendationSample(amount: number) {
    for (let i = 0; i < amount; i++) {
        await prisma.recommendation.create({
            data: {
                name: faker.lorem.words(2),
                youtubeLink: "https://www.youtube.com/watch?v=P4DWLag9c_Y",
            },
        });
    }
}

async function createRecommendationsWithScore(
    amount: number,
    topScore: number
) {
    for (let i = 0; i <= amount; i++) {
        if (i === amount) {
            await prisma.recommendation.create({
                data: {
                    name: faker.lorem.words(2),
                    youtubeLink: "https://www.youtube.com/watch?v=P4DWLag9c_Y",
                    score: topScore,
                },
            });
            return;
        }
        const score = Math.floor(Math.random() * topScore);

        await prisma.recommendation.create({
            data: {
                name: faker.lorem.words(2),
                youtubeLink: "https://www.youtube.com/watch?v=P4DWLag9c_Y",
                score,
            },
        });
    }
}

export default {
    returnRecommendationBody,
    createRecommendation,
    findUniqueByName,
    findUniqueById,
    createRandomRecommendationSample,
    createRecommendationsWithScore,
};
