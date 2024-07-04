import express from "express"
import bodyParser from "body-parser";
import cors from "cors"
import cookieParser from "cookie-parser";


import holdingsRouter from "./routes/allHoldings.routes.js";
import positionsRouter from "./routes/allPositions.routes.js";
import userRouter from "./routes/user.routes.js";
import orderRouter from "./routes/orders.routes.js";

const app = express()

const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:3001'], // Replace with your allowed origins
    credentials: true, // Allow credentials (cookies)
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser()); //cookies for storing access and refresh tokens

//routes
app.use("/api/v1/allHoldings", holdingsRouter);
app.use("/api/v1/allPositions", positionsRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/orders", orderRouter);

export { app }