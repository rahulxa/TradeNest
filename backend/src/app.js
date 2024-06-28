import express from "express"
import bodyParser from "body-parser";
import cors from "cors"

import { holdingsRouter } from "./routes/allHoldings.routes.js";
import { positionsRouter } from "./routes/allPositions.routes.js";

const app = express()

app.use(cors());
app.use(bodyParser.json());

app.use("/api/v1/allHoldings", holdingsRouter);
app.use("/api/v1/allPositions", positionsRouter);

export { app }