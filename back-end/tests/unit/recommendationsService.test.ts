import { recommendationService } from "../../src/services/recommendationsService.js";
import { recommendationRepository } from "../../src/repositories/recommendationRepository.js";
import { jest } from "@jest/globals";
import recommendationFactory from "../factories/recommendationFactory.js";
import { conflictError, notFoundError } from "../../src/utils/errorUtils.js";

describe("Test recommendationService", () => {
    beforeEach(async () => {
        jest.clearAllMocks();
        jest.resetAllMocks();
    });

    describe("Test insert function", () => {
        it("should throw error given existing recommendation", () => {
            const body = recommendationFactory.returnRecommendationBody();

            jest.spyOn(
                recommendationRepository,
                "findByName"
            ).mockResolvedValue({
                id: 2,
                name: body.name,
                youtubeLink: body.youtubeLink,
                score: 0,
            });

            return expect(recommendationService.insert(body)).rejects.toEqual(
                conflictError("Recommendations names must be unique")
            );
        });

        it("should create a recommendation successfully", async () => {
            const body = recommendationFactory.returnRecommendationBody();

            jest.spyOn(
                recommendationRepository,
                "findByName"
            ).mockResolvedValue(null);

            const recommendationRepositoryCreate = jest
                .spyOn(recommendationRepository, "create")
                .mockResolvedValue(null);

            await recommendationService.insert(body);

            expect(recommendationRepositoryCreate).toBeCalledTimes(1);
            expect(recommendationRepositoryCreate).toBeCalledWith(body);
        });
    });

    describe("Test upvote function", () => {
        it("should throw given invalid id", () => {
            jest.spyOn(recommendationRepository, "find").mockResolvedValue(
                null
            );
            return expect(recommendationService.upvote(2)).rejects.toEqual(
                notFoundError()
            );
        });

        it("should increase score successfully", async () => {
            jest.spyOn(recommendationRepository, "find").mockResolvedValue({
                id: 1,
                name: "fake",
                youtubeLink: "fake",
                score: 0,
            });

            const recommendationRepositoryUpdate = jest
                .spyOn(recommendationRepository, "updateScore")
                .mockResolvedValue(null);

            await recommendationService.upvote(1);

            expect(recommendationRepositoryUpdate).toBeCalledTimes(1);
            expect(recommendationRepositoryUpdate).toBeCalledWith(
                1,
                "increment"
            );
        });
    });

    describe("Test downvote function", () => {
        it("should decrease score and remove recommendation", async () => {
            jest.spyOn(recommendationRepository, "find").mockResolvedValue({
                id: 1,
                name: "fake",
                youtubeLink: "fake",
                score: -5,
            });

            jest.spyOn(
                recommendationRepository,
                "updateScore"
            ).mockResolvedValue({
                id: 1,
                name: "fake",
                youtubeLink: "fake",
                score: -6,
            });

            const recommendationRepositoryRemove = jest
                .spyOn(recommendationRepository, "remove")
                .mockResolvedValue(null);

            await recommendationService.downvote(1);

            expect(recommendationRepositoryRemove).toBeCalledTimes(1);
            expect(recommendationRepositoryRemove).toBeCalledWith(1);
        });

        it("should decrease recommendation score", async () => {
            jest.spyOn(recommendationRepository, "find").mockResolvedValue({
                id: 1,
                name: "fake",
                youtubeLink: "fake",
                score: 0,
            });

            const recommendationRepositoryUpdate = jest
                .spyOn(recommendationRepository, "updateScore")
                .mockResolvedValue({
                    id: 1,
                    name: "fake",
                    youtubeLink: "fake",
                    score: -1,
                });

            await recommendationService.downvote(1);
            expect(recommendationRepositoryUpdate).toBeCalledTimes(1);
            expect(recommendationRepositoryUpdate).toBeCalledWith(
                1,
                "decrement"
            );
        });
    });

    describe("Test get function", () => {
        it("should get all recommendations", async () => {
            const recommendationRepositoryGet = jest
                .spyOn(recommendationRepository, "findAll")
                .mockResolvedValue(null);
            await recommendationService.get();
            expect(recommendationRepositoryGet).toBeCalledTimes(1);
        });
    });

    describe("Test getTop function", () => {
        it("should get top recommendations by amount", async () => {
            const recommendationRepositoryGetTop = jest
                .spyOn(recommendationRepository, "getAmountByScore")
                .mockResolvedValue(null);
            await recommendationService.getTop(5);
            expect(recommendationRepositoryGetTop).toBeCalledTimes(1);
        });
    });

    describe("Test getRandom function", () => {
        it("should throw when find no recommendations", () => {
            jest.spyOn(
                recommendationService,
                "returnMathRandom"
            ).mockReturnValue(0.69);

            jest.spyOn(recommendationRepository, "findAll").mockResolvedValue(
                []
            );

            return expect(recommendationService.getRandom()).rejects.toEqual(
                notFoundError()
            );
        });

        it("should return random recommendation gt", async () => {
            jest.spyOn(
                recommendationService,
                "returnMathRandom"
            ).mockReturnValue(0.69);

            jest.spyOn(recommendationRepository, "findAll").mockResolvedValue([
                {
                    id: 1,
                    name: "fake1",
                    youtubeLink: "fake",
                    score: -5,
                },
                {
                    id: 1,
                    name: "fake2",
                    youtubeLink: "fake",
                    score: -5,
                },
            ]);

            const result = await recommendationService.getRandom();
            expect(result.name).toMatch(/fake1|fake2/);
        });

        it("should return random recommendation lte", async () => {
            jest.spyOn(
                recommendationService,
                "returnMathRandom"
            ).mockReturnValue(0.71);

            jest.spyOn(recommendationRepository, "findAll").mockResolvedValue([
                {
                    id: 1,
                    name: "fake1",
                    youtubeLink: "fake",
                    score: -5,
                },
                {
                    id: 1,
                    name: "fake2",
                    youtubeLink: "fake",
                    score: -5,
                },
            ]);

            const result = await recommendationService.getRandom();
            expect(result.name).toMatch(/fake1|fake2/);
        });
    });
});
