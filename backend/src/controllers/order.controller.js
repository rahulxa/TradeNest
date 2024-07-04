import { asyncHandler } from "../utils/asyncHandler";
import { Order } from "../models/Orders.models";
import { ApiError } from "../utils/apiError";
import { ApiResponse } from "../utils/apiResponse";
import mongoose, { isValidObjectId } from "mongoose";
import { User } from "../models/user.model";

const placeOrder = asyncHandler(async (req, res) => {
    const { stockName, qty, price, mode } = req.body;
    const userId = req.user?._id; //apply jwt middleware

    if ([stockName, qty, price, mode].some((feild) => { return feild?.trim() == "" })) {
        throw new ApiError(400, "All feilds are required")
    }

    const order = await Order.create({
        stockName,
        qty,
        price,
        mode,
        owner: userId
    });

    const placedOrder = await Order.findById(order._id);

    if (!placedOrder) {
        throw new ApiError(500, "Something went wrong while placing the order")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, placedOrder, "Order placed successfully"));
});



const getUserOrders = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    if (!isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid user id")
    }

    const user = await User.findById(userId)
    if (!user) {
        throw new ApiError(400, "User not found")
    }

    const orders = await Order.find({ owner: userId });

    return res
        .status(200)
        .json(new ApiResponse(200, { orders }, "Orders fetched successfully"));
});



export {
    placeOrder,
    getUserOrders
}