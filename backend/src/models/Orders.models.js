import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema({
    name: {
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
    }
})


export const Orders = mongoose.model("Order", orderSchema)