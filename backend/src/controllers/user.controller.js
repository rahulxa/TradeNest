import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Jwt from "jsonwebtoken"
import { ApiError } from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js"

const generateAccessAndRefreshTokens = async (userid) => {
    try {
        const user = await User.findById(userid)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false }); //only saving the newly created refresh token to the database and not others

        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access tokens")
    }
}


const signupUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    console.log("username:", username, "password:", password, "email:", email)

    //validation for all fields
    if ([, email, password, username].some((feild) => { return feild?.trim() == "" })) {
        throw new ApiError(400, "All feilds are required")
    }

    //checking existing user
    const existingUser = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (existingUser) {
        throw new ApiError(404, "User with this username or email already exists, if you already have an account please login to continue!")
    }

    const user = await User.create({
        username,
        email,
        password
    });

    const createdUser = await User.findById(user._id).select("-password,-refreshToken");

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while signing in")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, createdUser, " User created successfully"));
})


const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (!username && !password) {
        throw new ApiError(400, "Username or password missing")
    }

    const user = await User.findOne({ username });

    if (!user) {
        throw new ApiError(404, "User does not exists")
    }

    const checkPassword = await user.isPasswordCorrect(password);
    if (!checkPassword) {
        throw new ApiError(400, "Incorrect password")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

    const loggedInUser = await User.findById(user._id).select("-password");

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .json(new ApiResponse(200, loggedInUser, " User created successfully"))
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)

})


const logoutUser = asyncHandler(async (req, res) => {
    // console.log("User logging out: ", req.user._id); // Debugging
    await User.findByIdAndUpdate(
        req.user._id, //find the user by this id
        { $unset: { refreshToken: 1 } }, //and remove this field
        { new: true }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged out Sucessfully"))
});


const getNewAccessToken = asyncHandler(async (req, res) => {
    //fetching the incoming refresh token from cookies
    const incomingRefreshToken = req.cookies?.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized request")
    }

    try {
        //veryfing and decoding the recevied token
        const verifyToken = Jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

        //finding the user with the same id
        const user = await User.findById(verifyToken?._id).select("-password");

        //if user not found
        if (!user) {
            throw new ApiError(401, "Invalid refresh token")
        }
        //validating the refresh token
        if (user?.refreshToken !== incomingRefreshToken) {
            throw new ApiError(404, "Refresh token is expired or used");
        }

        //generating new tokens
        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

        const options = {
            httpOnly: true,
            secure: true
        }

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(new ApiResponse(200, { user: accessToken, refreshToken }, "New tokens generated successfully"))

    } catch (error) {
        throw new ApiError(404, error?.message || "Invalid refresh token")
    }
});

const getCurrentUser = asyncHandler(async (req, res) => {
    const loggedInUser = req.user;
    return res
        .status(200)
        .json(new ApiResponse(200, { loggedInUser }, "Current user fetched successfully"))
})

export {
    signupUser,
    loginUser,
    logoutUser,
    getNewAccessToken,
    getCurrentUser
}