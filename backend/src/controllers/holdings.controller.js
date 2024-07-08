import { asyncHandler } from "../utils/asyncHandler.js"
import { Holdings } from "../models/Holding.models.js"
import { isValidObjectId } from "mongoose";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";


const createUserHoldings = asyncHandler(async (req, res) => {
    const { stockName, qty, price, avgCost, dayChange, isLoss } = req.body;
    const userId = req.params?._id || req.user?._id//apply jwt

    // if (!stockName || !qty || !price || typeof qty !== 'number' || typeof price !== 'number') {
    //     throw new ApiError(400, "Stock name, quantity, and price are required and must be numeric.");
    // }

    try {
        const holdings = await Holdings.findOne({ owner: userId, stockName: stockName });

        if (holdings) {
            const updatedHoldings = await Holdings.findOneAndUpdate(
                { owner: userId, stockName: stockName },
                { $inc: { qty: qty } },
                { new: true } // Return the updated document
            );
            return res
                .status(200)
                .json({ message: "Stock quantity updated", data: updatedHoldings });
        } else {
            const holdings = await Holdings.create({
                stockName,
                qty,
                price,  //idhar
                avgCost,
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
        }
    } catch (error) {
        console.error("Error creating/updating holdings:", error);
        return res
            .status(500)
            .json(new ApiError(200, "Internal server errro"));
    }
});


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
});


const updateUserHoldings = asyncHandler(async (req, res) => {
    const { stockName, qty } = req.body;
    const userId = req.params?._id || req.user?._id//apply jwt

    if (!stockName || qty === 0) {
        throw new ApiError(400, "Stockname and qty are required fields");
    }

    if (!isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid user id");
    }

    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const holding = await Holdings.findOne({ stockName: stockName, owner: userId });
    if (!holding) {
        throw new ApiError(404, "Holding not found");
    }

    if (qty === holding.qty) {
        const deletedHolding = await Holdings.findByIdAndDelete(holding._id);
        if (!deletedHolding) {
            throw new ApiError(500, "Something went wrong while deleting the stock");
        }

        return res
            .status(200)
            .json(new ApiResponse(200, { deletedHolding }, "Holding deleted successfully"));
    } else {
        const updatedHolding = await Holdings.findByIdAndUpdate(
            holding._id,
            { $set: { qty: qty } },
            { new: true }
        );
        if (!updatedHolding) {
            throw new ApiError(500, "Something went wrong while updating the stock");
        }
        return res
            .status(200)
            .json(new ApiResponse(200, { updatedHolding }, "Holdings updated successfully"));
    }
});


export { getUserHoldings, createUserHoldings, updateUserHoldings }