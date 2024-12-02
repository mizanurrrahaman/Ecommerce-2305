// src/models/cardmodel.js
import mongoose from 'mongoose';

const cardSchema = new mongoose.Schema({
  user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
       },     
  product: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product', 
      },
  inventory:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Inventory', 
  },
  quantity: { 
    type: Number, 
     }
});

const Card = mongoose.model('Card', cardSchema);
export default Card;  // Default export









{/*
    import mongoose, { Schema } from "mongoose";
    
    const card = new Schema({
        user:{
            type: mongoose.Types.ObjectId,
            ref: "User"
        },
        product:{
            type: mongoose.Types.ObjectId,
            ref: "Product"
        },
        inventory:{
            type: mongoose.Types.ObjectId,
            ref: "Inventory"
        },
        quantity:{
            type: Number
        }
    },{
        timestamps: true
    })
    
    const Card = mongoose.model('Card', cardmodel);
    export default Card;
    //export const Card = mongoose.model("Cart", "cardmodel")

*/}
