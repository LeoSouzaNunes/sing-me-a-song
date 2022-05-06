import { Router } from "express";
import testsController from "../controllers/testsController.js";

const testsRouter = Router();

testsRouter.post("/reset-database", testsController.reset);

export default testsRouter;
