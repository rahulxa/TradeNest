import express from "express"
import bodyParser from "body-parser";
import cors from "cors"
import cookieParser from "cookie-parser";


import { holdingsRouter } from "./routes/allHoldings.routes.js";
import { positionsRouter } from "./routes/allPositions.routes.js";
import userRouter from "./routes/user.routes.js";

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
app.use(bodyParser.json());
app.use(cookieParser()); //cookies for storing access and refresh tokens


app.use("/api/v1/allHoldings", holdingsRouter);
app.use("/api/v1/allPositions", positionsRouter);
app.use("/api/v1/users", userRouter)

export { app }