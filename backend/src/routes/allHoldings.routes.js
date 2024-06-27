import { Router } from "express";
import { allHoldings } from "../controllers/holdings.controller.js";

const holdingsRouter = Router();

holdingsRouter.get("/", allHoldings)

export { holdingsRouter }
