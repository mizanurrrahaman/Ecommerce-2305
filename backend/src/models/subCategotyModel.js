import mongoose, { Schema} from "mongoose";


const subCategotyModel = new Schema({
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
    category:{
        type: mongoose.Types.ObjectId,
        ref: "Category"

    }
}, {timestamps: true})

export const SubCategoty = mongoose.model("SubCategory", subCategotyModel)