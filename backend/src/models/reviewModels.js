import mongoose, { Schema } from "mongoose";

const reviewModels = new Schema({
    
    rating: {
        type: Number,
        max: 5
    },
    comment: {
        type: String
    },
    reviewImage: [
        {
            type: String
        }
    ],
    product: {
        type: mongoose.Types.ObjectId,
        ref: "Product"
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }

}, { timestamps: true})

export const Review = mongoose.model("Review", reviewModels)