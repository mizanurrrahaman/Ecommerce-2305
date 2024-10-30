import mongoose, { Schema} from "mongoose";
  
  const productSchema = new Schema({
  
      title: {
          type: String,
          required: true
      },
      slug: {
          type: String,
          required: true,
          unique: true
      },
      category:{
        type: mongoose.Types.ObjectId,
        ref: "Category",
        required: true
      },
      subcategory: {
         type: mongoose.Types.ObjectId,
         ref: "SubCategory",
         required: true
       },
      inventory: [
          {
             type: mongoose.Types.ObjectId,
             ref: "Inventory"
          }
      ],
      thumbnail: {
           publicId: {
             type: String,
             required: true
           },
         imagePath:{
          type: String,
          required: true,
        
          //default: "default-image-path.jpg" 
         },
      },
       gallery: [
          {
           publicId: {
             type: String,
            
            },
           imagePath:{
            type: String,
           
           }
          }
       ],
     
      description: {
          type: String
      }
  }, {
      timestamps: true
  })
  
  export const Product = mongoose.model("Product", productSchema)

{/*
  import mongoose, { Schema} from "mongoose";
  
  const productSchema = new Schema({
  
      title: {
          type: String,
          required: true
      },
      slug: {
          type: String,
          required: true,
          unique: true
      },
      category:{
        type: mongoose.Types.ObjectId,
        ref: "Category",
        required: true
      },
      subcategory: {
         type: mongoose.Types.ObjectId,
         ref: "SubCategory",
         required: true
       },
      inventory: [
          {
             type: mongoose.Types.ObjectId,
             ref: "Inventory"
          }
      ],
      thumbnail: {
           publicId: {
             type: String,
             required: true
           },
         imagePath:{
          type: String,
          required: true,
        
          //default: "default-image-path.jpg" 
         },
      },
      // gallery: [
      //    {
      //     publicId: {
      //       type: String,
            
      //      },
      //     imagePath:{
      //      type: String,
           
      //     }
      //    }
      // ],
      gallery: [
        {
          imagePath: {
            type: String,
            required: true,
          },
          publicId: {
            type: String,
          },
        },
      ],
      description: {
          type: String
      }
  }, {
      timestamps: true
  })
  
  export const Product = mongoose.model("Product", productSchema)

*/}
