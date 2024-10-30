import apiResponse from "quick-response"
import { Category } from "../models/categoryModel.js"


 const categoryCreate = async(req, res)=>{
  try {
    let newSlug 
    const {name, slug} = req.body
    if(!name){
      return res.json(apiResponse(400, "name is required"))
    }
    if(!slug){
      newSlug = name.replace(" ", "-").toLowerCase()
    }
    else{
      newSlug = slug.replace(" ", "-").toLowerCase()
    }
    const category = await Category.create({name, slug: newSlug})
    return res.json(apiResponse(201, "category created", {category}))
    
  } catch (error) {
    console.log(error);
  }
}

const allCategoryCreate = async (req, res) =>{
   try {
     const data = await Category.find().populate("category")
    
     return res.json(apiResponse(200, "all categories", { data }))
   } catch (error) {
    console.log("kasvfgi", error)
   }
}

export {categoryCreate, allCategoryCreate}