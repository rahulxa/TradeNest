import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema({
    stockName: {
        type: String,
        required: true
    },
    qty: { 
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    mode: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})


export const Order = mongoose.model("Order", orderSchema)