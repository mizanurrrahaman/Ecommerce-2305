import apiResponse from "quick-response";
import  {Product}  from "../models/productModel.js";
import { cloudinaryUpload } from "../services/cloudinary.js";



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

export { createProduct };







