import { Request, Response } from "express";
import testsService from "../services/testsService.js";

async function reset(req: Request, res: Response) {
    await testsService.reset();
    res.sendStatus(200);
}

export default { reset };
