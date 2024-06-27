import mongoose, { Schema } from "mongoose";

const holdingsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    avg: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    net: {
        type: String,
        required: true
    },
    day: {
        type: String,
    },
    isLoss: {
        type: String
    }
}, { timestamps: true })


export const Holdings = mongoose.model("Holding", holdingsSchema)