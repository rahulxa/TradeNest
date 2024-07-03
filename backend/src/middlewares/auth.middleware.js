import { ApiError } from "../utils/apiError.js";
import Jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization;

    try {
        let token;

        if (req.cookies?.accessToken) {
            token = req.cookies.accessToken;
        } else if (authHeader && authHeader.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1];
            console.log("Auth header:", token);
        }

        if (!token) {
            throw new ApiError(400, "Unauthorized request");
        }

        const decodedToken = Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        console.log("Decoded Token: ", decodedToken);

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
        console.log("User found: ", user);

        if (!user) {
            throw new ApiError(400, "Invalid access Token");
        }
        
        req.user = user;
        console.log("this is the user found")
        next();
        console.log("this is another the user found")
    } catch (error) {
        console.log("Error in verifyJWT: ", error);
        throw new ApiError(401, error?.message || "Invalid access token");
    }
});
