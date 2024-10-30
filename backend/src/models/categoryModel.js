import mongoose, { Schema} from "mongoose";

const categoryModel = new Schema({
    name: {
      type: String,
      unique: true,
      required: true
    },
    slug: {
        type: String,
        unique: true,
        required: true
    },
    subCategory: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Subcategory"
    
        }
    ]
}, {timestamps: true})

export const Category =mongoose.model("Category", categoryModel)