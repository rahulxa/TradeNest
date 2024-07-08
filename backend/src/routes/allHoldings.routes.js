import { Router } from "express";
import { getUserHoldings, createUserHoldings, updateUserHoldings } from "../controllers/holdings.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const holdingsRouter = Router();

holdingsRouter.route("/create-holdings").post(verifyJWT, createUserHoldings);
holdingsRouter.route("/get-holdings/:userId").get(verifyJWT, getUserHoldings);
holdingsRouter.route("/update-holdings/:userId").patch(verifyJWT,updateUserHoldings);


export default holdingsRouter;
