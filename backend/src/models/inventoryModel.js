import mongoose, { Schema } from "mongoose";

const inventoryModel = new Schema({
  product: {
    type: mongoose.Types.ObjectId,
    ref: "Inventory"
  },
  variation: {
    type: mongoose.Types.ObjectId,       
    ref: "Variation"
   },
   purchasePrice: Number,
   sellingPrice: Number,
   discountPrice: {
      price: {
       type: Number,
      },
      type: {
        type: String,
        enum: ["ammount", "parcentage"]
      }
   },
   quatity:{
     type: Number
   }
}, { timestamps: true})

export const Inventory = mongoose.model("Inventory", inventoryModel)