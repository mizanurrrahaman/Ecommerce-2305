import mongoose, { Schema } from "mongoose";

const shippingModel = new Schema({
    sname: String,
    scountry: {
        type: String,
        default: "Bangladesh"
    },
    saddress: String,
    scity: String,
    sdistrict: String,
    spostcode: String,
    sphone: String,
    semail: String,

},{
    timestamps: true
})

export const Shipping = mongoose.model("Shipping", shippingModel)