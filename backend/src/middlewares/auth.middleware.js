import { ApiError } from "../utils/apiError.js";
import Jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        console.log("cookies", req.cookies);
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        console.log("Token retrieved: ", token); // Debugging

        if (!token) {
            throw new ApiError(400, "Unauthorized request");
        }

        const decodedToken = Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        console.log("Decoded Token: ", decodedToken); // Debugging

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
        console.log("User found: ", user); // Debugging

        if (!user) {
            throw new ApiError(400, "Invalid access Token");
        }

        req.user = user;
        next();
    } catch (error) {
        console.log("Error in verifyJWT: ", error); // Debugging
        throw new ApiError(401, error?.message || "Invalid access token");
    }
});
