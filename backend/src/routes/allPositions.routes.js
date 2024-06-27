import { Router } from "express";
import { allPositions } from "../controllers/positions.controller.js";

const positionsRouter = Router();

positionsRouter.get("/", allPositions)

export { positionsRouter }
