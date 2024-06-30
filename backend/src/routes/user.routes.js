import { Router } from "express";
import {
    signupUser,
    loginUser,
    logoutUser,
    getNewAccessToken,
    getCurrentUser
} from "../controllers/user.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";


const userRouter = Router();

userRouter.route("/signup").post(signupUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/logout").post(verifyJWT, logoutUser);
userRouter.route("/refresh-token").post(getNewAccessToken);
userRouter.route("/current-user").get(verifyJWT, getCurrentUser);

export default userRouter;