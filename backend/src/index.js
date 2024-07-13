import connectDB from "./db/index.js";
import dotenv from "dotenv"
import { app } from "./app.js";

const PORT = 3002

dotenv.config({
    path: "./env"
})

connectDB()
    .then(() => {
        app.on("error", (err) => {
            console.log("error connecting to the server:", err)
            throw err;
        });
        app.listen(PORT, () => {
            console.log("server listening at port:", PORT)
        });
    })
    .catch((err) => {
        console.log("mongo db connection fail:", err);
    })














