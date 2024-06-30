import { ApiError } from "../utils/apiError";
import Jwt from "jsonwebtoken"
import User from "../models/user.model"
import { asyncHandler } from "../utils/asyncHandler";


export const verifyJWT = asyncHandler(async (res, res) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            throw new ApiError(400, "Unauthorized request")
        }

        const decodedToken = Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

        if (!user) {
            throw new ApiError(400, "Invalid access Token")
        }

        req.user = user;
        next();

    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
})