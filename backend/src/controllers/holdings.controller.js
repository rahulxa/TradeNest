import { asyncHandler } from "../utils/asyncHandler.js"
import { Holdings } from "../models/Holding.models.js"
import { isValidObjectId } from "mongoose";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";


const createUserHoldings = asyncHandler(async (req, res) => {
    const { stockName, qty, avgCost, price, netChange, dayChange, isLoss } = req.body;
    const userId = req.params?._id //apply jwt 

    if ([stockName, qty, avgCost, price, netChange, dayChange, isLoss].some((feild) => { return feild?.trim() == "" })) {
        throw new ApiError(400, "All feilds are required")
    }

    const holdings = await Holdings.create({
        stockName,
        qty,
        avgCost,
        price,
        netChange,
        dayChange,
        isLoss,
        owner: userId
    });

    const createdHoldings = await Holdings.findById(holdings._id);

    if (!createdHoldings) {
        throw new ApiError(500, "Something went wrong while creating the holdings")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, createdHoldings, "Holdings created successfully"))
})


const getUserHoldings = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    if (!isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid user id")
    }

    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(400, "User not found")
    }

    const holdings = await Holdings.find({ owner: userId });

    return res
        .status(200)
        .json(new ApiResponse(200, { holdings }, "Holdings fetched successfully"));
})

export { getUserHoldings, createUserHoldings }