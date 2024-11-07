import apiResponse from "quick-response";
import  {Product}  from "../models/productModel.js";
import { cloudinaryUpload } from "../services/cloudinary.js";
import { Inventory } from "../models/inventoryModel.js";
import { Category } from "../models/categoryModel.js";
import { SubCategoty } from "../models/subCategotyModel.js";



const createProduct = async (req, res) => {
  try {
    const { title, slug, category, subcategory } = req.body;
    const { thumbnail, gallery } = req.files;
     console.log(req.files)
    let thumbnailImgPath = thumbnail[0].path;

  
    // Generate new slug
    let newSlug;
    if (!slug) {
      newSlug = title.replaceAll(' ', '-').toLowerCase() + '-' + Date.now();
    } else {
      const isSlugUnique = await Product.findOne({ slug });
      if (isSlugUnique) {
        return res.status(400).json(apiResponse(400, 'slug must be unique'));
      }
      newSlug = slug.replaceAll(' ', '-').toLowerCase() + '-' + Date.now();
    }
  
    // Upload thumbnail image
    const productThumbnailImg = await cloudinaryUpload(
      thumbnailImgPath,
      newSlug,
      'product'
    );
  
    const product = new Product();
     // Upload gallery images
     if (req.files?.gallery) {
      const galleryImages = gallery.map((file) => file.path);
      let galleryPublicId = ""
      for (let imagePath of galleryImages) {
         galleryPublicId = imagePath
          .replace('public/temp/', '')
          .replace(/\.(png|jpg|jpeg|gif|bmp|tiff|webp)$/i, '');
  
        const uploadedGalleryImage = await cloudinaryUpload(
          imagePath,
          galleryPublicId,
          'product/gallery'
        );
       // console.log(uploadedGalleryImage)
  
        product.gallery.push({
          imagePath: uploadedGalleryImage.optimizeUrl,
          publicId: galleryPublicId,
        })
      }
    }
    product.title = title;
    product.category = category;
    product.subcategory = subcategory;
    product.slug = newSlug;
    product.thumbnail.imagePath = productThumbnailImg.optimizeUrl
    product.thumbnail.publicId = productThumbnailImg.uploadResult.public_id
  
  
    await product.save();
  
    return res
      .status(201)
      .json(apiResponse(201, 'product created', { data: product }));
  } catch (error) {
    console.error('Error creating product:', error);
    return res
      .status(500)
      .json(apiResponse(500, 'Internal server error', { error: error.message }));
  }
}

const delateProduct = async (req, res) =>{

  try {
    
    const {id} = req.params
    await Inventory.deleteMany({product: id})
    await Product.findByIdAndDelete({ _id: id })
    res.json("delete")

  } catch (error) {
    console.log(error)
  }


}


const pagination = async (req, res)=>{
   try{
       const { page, limit, category, subcategory, price_s} = req.query
       let filter ={}
       if(category){
         const categoryDoc = await Category.findOne({ name: category});
         console.log(categoryDoc)
         if(categoryDoc){
           filter.category = categoryDoc._id
           console.log(filter)
         }
       }

       if(subcategory){
        const categoryDoc = await SubCategoty.findOne({name: subcategory});
        console.log(categoryDoc)


        if(subcategoryDoc){
         filter.subcategory = subcategoryDoc._id;
         console.log(filter)
        }

       }

      let sortOrder = {}; 
      if(price_s == "ase"){
        sortOrder["inventory.sellingPrice"] =1;
         //const inventoryDoc = await Inventory.find().sort({ sellingPrice: 1});
        }
        else if(price_s === "desc"){
          sortOrder["inventory.sellingPrice"] =-1;
        }

       console.log(sortOrder)



      //  const products = await Product.find(filter).populate({path: "category", select: "name"}).populate({ path: "subcategory", select:"name"})
      //  return res.json({ products, total:products.length })
      
        let currentPage
        if(page < 1){
         currentPage = 1
         const baseLimit = limit || 2
         const skip = Number((currentPage - 1) * baseLimit)
         const products = await Product.find(filter).populate({path: "category", select: "name"}).populate({ path: "subcategory", select:"name"}).skip(skip).limit(baseLimit).populate({ path: "inventory", select: "sellingPrice quatity"}).skip(skip).limit(baseLimit).sort({["inventory.sellingPrice"]:1})
         const totalProducts = await Product.find(filter).countDocuments()
         const totalPages = Math.ceil((totalProducts/baseLimit))
         console.log(totalPages)
         console.log(totalProducts);
     
         res.json({ products, totalPages, totalProducts, baseLimit, currentPage, length:products.length})
        }
        else{
           currentPage = Number(page || 1) 
           const baseLimit = limit || 2
           const skip = Number((currentPage - 1) * baseLimit)
           const products = await Product.find(filter).populate({path: "category", select: "name"}).populate({ path: "subcategory", select:"name"}).skip(skip).limit(baseLimit).populate({ path: "inventory", select: "sellingPrice quatity"}).skip(skip).limit(baseLimit).sort({["inventory.sellingPrice"]:1})
           const totalProducts = await Product.find(filter).countDocuments()
           const totalPages = Math.ceil((totalProducts/baseLimit))
           console.log(totalPages)
          
           res.json({ products, totalPages, totalProducts, baseLimit, currentPage, length:products.length})
        }

   } catch(error){

   }
}




export { createProduct, delateProduct, pagination };







