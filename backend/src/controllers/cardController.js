import apiResponse from "quick-response"
import Card from "../models/cardmodel.js";
//import {Card} from "../models/cardmodel.js";



const createCart = async (req, res) =>{
    try {
        const { user, product, inventory, quantity } = req.body;
        if ([user, product, inventory, quantity].some((field) => field === "")) 
        {
          return res.json(apiResponse(400, "All fields are required"));
        }
        const isCart = await Card.findOne({user, inventory})
        if(isCart){
          const cart = await Card.findByIdAndUpdate({ _id: isCart._id}, {
            $inc: {quantity: 1}}, {new: true})
            return res.json(apiResponse(201, "Cart created", { cart }));
        }
         else{
           const cart = await Card.create({ user, product, inventory, quantity });
           return res.json(apiResponse(201, "card created", {cart}))
         }
      } catch (error) {
        console.error("Error in createCart:", error);
        return res.json(apiResponse(500, "Internal server error"));
      }
    };



  const updateQuantity = async (req, res) =>{
     try{

       const { user, inventory, value} = req.body
       if([user, inventory, value].some((field) => field === "")){
         return res.json(apiResponse(400, "all fields are required"))
       } 
       if( value === "plus"){
          const cart = await Card.findOneAndUpdate({ user, inventory}, {$inc: {quantity:1}}, {new: true})
          return res.json(apiResponse(201, "cart updated", {cart}))
       } else if(value === "minus"){
        const cart = await Card.findOneAndUpdate({user, inventory}, { 
          $inc: { quantity: -1}}, {new: true})
          return res.json(apiResponse(201, "cart updated", {cart}))
       }

     } catch(error){
      console.log("cart", error)
     }
  }  

export {createCart, updateQuantity}

{/*
    import { Card } from "../models/cardmodel.js"
    
    
    const createCart = async (req, res) =>{
        try{
          const {user, product, inventory, quantity} = req.body
          if([user, product, inventory, quantity].some((field) => field === ""))
          {
             return res.json(apiResponse(400, "all fields are required"))
          }
           const cart = await Card.create({user, product, inventory, quantity})
           return res.json(apiResponse(201,"cart create", {cart}))
        } catch(error){
            console.log("cart", error)
        }
    }
    
    export { createCart}

*/}