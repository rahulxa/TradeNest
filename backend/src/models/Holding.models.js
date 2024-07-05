import mongoose, { Schema } from "mongoose";

const holdingsSchema = new Schema({
    stockName: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    avgCost: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    netChange: {
        type: String,
        required: true
    },
    dayChange: {
        type: String,
        required: true
    },
    isLoss: {
        type: Boolean,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true })


export const Holdings = mongoose.model("Holding", holdingsSchema)