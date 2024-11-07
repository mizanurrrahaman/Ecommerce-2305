import apiResponse from "quick-response";
import { Product } from "../models/productModel.js";
import { Inventory } from "../models/inventoryModel.js";

async function createInventory(req, res) {
    try {
        // Destructure 'quantity' correctly from req.body
        const { product, variation, purchasePrice, sellingPrice, discountPrice, quantity } = req.body;

        // Check for empty required fields
        if ([product, variation, purchasePrice, sellingPrice, quantity].some((field) => field === "")) {
            return res.json(apiResponse(400, "All fields are required"));
        }

        // Create the inventory item
        const inventory = await Inventory.create({ product, variation, purchasePrice, sellingPrice, discountPrice, quantity });
        
        // Update the product's inventory reference
        await Product.findByIdAndUpdate(
            { _id: product },
            { $push: { inventory: inventory._id } }
        );

        // Return successful response
        return res.json(apiResponse(201, "Inventory created", { inventory }));
        
    } catch (error) {
        console.log("Error:", error);
        return res.status(500).json(apiResponse(500, "Server error"));
    }
}

async function updateInventory(req, res) {
  try{
    
     const {id} = req.params
        const { product, variation, purchasePrice, sellingPrice, discountPrice, quantity } = req.body;
        if ([product, variation, purchasePrice, sellingPrice, quantity].some((field) => field === "")) {
            return res.json(apiResponse(400, "All fields are required"));
        }
        const isFound = await Inventory.findById({ _id: id})
        if(!isFound){
            return res.json(apiResponse(404, "inventory not found "))
        }
        const inventory = await Inventory.findByIdAndUpdate({_id:id}, {$set: {product, variation, purchasePrice, sellingPrice, discountPrice, quantity}},{
            new: true
        })

       // await Product.findByIdAndUpdate({_id: product}, { $push: {inventory: inventory._id}})

       if(product != isFound.product){
          await Product.findOneAndUpdate({ _id: product}, { $push: {inventory: inventory, _id}})
       }

        return res.json(apiResponse(201, "inventory create", { inventory}))

  } catch(error){
      console.log("i", error)
  }
}


async function allInventory(req, res) {
    try{
        
       const inventory = await Inventory.find().populate("product").populate("variation")
       return res.json(apiResponse(200, "inventory list", {inventory}))   
    } catch(error){
        console.log("i", error)
    }
  }

  async function delateById(req, res) {
    try{
        const {id} = req.params
       const inventory = await Inventory.findOneAndDelete({_id: id})
       return res.json(apiResponse(200, "inventory deleted", {inventory}))   
    } catch(error){
        console.log("i", error)
    }
  }

export { createInventory, updateInventory, allInventory, delateById};





{/*
    
    import apiResponse from "quick-response"
    //import { Inventory } from "../models/inventoryModel.js"
    import { Product } from "../models/productModel.js"
    import { Inventory } from "../models/inventoryModel.js"
    
    
    async function createInventory (req, res) {
    
        try {
            const {product, variation, purchasePrice, sellingPrice, discountPrice, quatity} = req.body
            if([product, variation, purchasePrice, sellingPrice, quatity].some((field) => field === "")){
                return res.json(apiResponse(400, "all fileds are required"))
            }
    
            const inventory = await Inventory.create({ product, variation, purchasePrice, sellingPrice, discountPrice, quantity });
            await Product.findByIdAndUpdate({ _id: product }, {$push: { inventory: inventory._id }})
            return res.json(apiResponse(201, "inventory create", {inventory}))
            
        } catch (error) {
            console.log("ii", error)
        }
        
       
    
        
    }
    
    
    export {createInventory}

*/}