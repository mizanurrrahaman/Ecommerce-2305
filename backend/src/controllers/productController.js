import apiResponse from "quick-response";
import  {Product}  from "../models/productModel.js";
import { cloudinaryUpload } from "../services/cloudinary.js";



const createProduct = async (req, res) => {
  try {
    const { title, slug, category, subcategory } = req.body;
    const { thumbnail, gallery } = req.files;
  
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
    product.thumbnail = {}; // Initialize thumbnail
  
    // Use `secure_url` from `uploadResult` as the imagePath
    product.thumbnail.imagePath = productThumbnailImg.uploadResult.secure_url;
    product.thumbnail.publicId = productThumbnailImg.uploadResult.public_id;
  
    // Assign other product details
    product.title = title;
    product.category = category;
    product.subcategory = subcategory;
    product.slug = newSlug;
  
    // Upload gallery images
    if (req.files?.gallery) {
      const galleryImages = gallery.map((file) => file.path);
  
      for (let imagePath of galleryImages) {
        const galleryPublicId = imagePath
          .replace('public/temp/', '')
          .replace(/\.(png|jpg|jpeg|gif|bmp|tiff|webp)$/i, '');
  
        const uploadedGalleryImage = await cloudinaryUpload(
          imagePath,
          galleryPublicId,
          'product/gallery'
        );
  
        // product.gallery.push({
        //   imagePath: uploadedGalleryImage.uploadResult.secure_url,
        //   publicId: galleryPublicId,
        // });
        product.gallery.push({
          imagePath: uploadedGalleryImage.optimizeUrl,
          publicId: newSlug,
        })
      }
    }
  
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




{/*
  try {
    const { title, slug, category, subcategory } = req.body;
    const { thumbnail, gallery } = req.files;
  
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
    product.thumbnail = {}; // Initialize thumbnail
  
    // Use `secure_url` from `uploadResult` as the imagePath
    product.thumbnail.imagePath = productThumbnailImg.uploadResult.secure_url;
    product.thumbnail.publicId = productThumbnailImg.uploadResult.public_id;
  
    // Assign other product details
    product.title = title;
    product.category = category;
    product.subcategory = subcategory;
    product.slug = newSlug;
  
    // Upload gallery images
    if (req.files?.gallery) {
      const galleryImages = gallery.map((file) => file.path);
  
      for (let imagePath of galleryImages) {
        const galleryPublicId = imagePath
          .replace('public/temp/', '')
          .replace(/\.(png|jpg|jpeg|gif|bmp|tiff|webp)$/i, '');
  
        const uploadedGalleryImage = await cloudinaryUpload(
          imagePath,
          galleryPublicId,
          'product/gallery'
        );
  
        product.gallery.push({
          imagePath: uploadedGalleryImage.uploadResult.secure_url,
          publicId: galleryPublicId,
        });
      }
    }
  
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
  ///////////////////////////////////////    
  import apiResponse from "quick-response";
  import { Product } from "../models/productModel.js";
  import { cloudinaryUpload } from "../services/cloudinary.js";
  
  const createProduct = async (req, res) => {
  
    try{
     const { title, slug, category, subcategory} = req.body
     const {thumbnail, gallery} = req.files;
  
     let thumbnailImgPath = thumbnail[0].path
  
       // generate new slug
       let newSlug
       if (!slug) {
         newSlug = title.replaceAll(' ', '-').toLowerCase() + '-' + Date.now()
       } else {
         const isSlugUnique = await Product.findOne({ slug })
         if (isSlugUnique) {
           return res.status(400).json(apiResponse(400, 'slug must be unique'))
         }
         newSlug = slug.replaceAll(' ', '-').toLowerCase() + '-' + Date.now()
       }
  
       const productThumbnailImg = await cloudinaryUpload(
        thumbnailImgPath,
        newSlug,
        'product'
      )
  
      const product = new Product()
  
       // upload gallery images
       if (req.files?.gallery) {
        let gallerPublicId = ''
        const { gallery } = req.files
  
        const galleryImages = gallery.map((path) => path.path)
  
        for (let imagePath of galleryImages) {
          gallerPublicId = imagePath
            .replace('public/temp/', '')
            .replace(/\.(png|jpg|jpeg|gif|bmp|tiff|webp)$/i, '')
  
          const uploadedGalleryImage = await cloudinaryUpload(
            imagePath,
            gallerPublicId,
            'product/gallery'
          )
  
          product.gallery.push({
            galleryImage: uploadedGalleryImage.optimizeUrl,
            publicId: gallerPublicId,
          })
        }
      }
  
      product.title = title
      product.category = category
      product.subcategory = subcategory
      product.slug = newSlug
      product.thumbnail.thumnailImage = productThumbnailImg.optimizeUrl
      product.thumbnail.publicId = productThumbnailImg.uploadResult.public_id
      await product.save()
      return res
        .status(201)
        .json(apiResponse(201, 'product created', { data: product }))
    } catch(error){
      console.error('Error creating product:', error);
      return res.status(500).json(apiResponse(500, 'Internal server error', { error: error.message }));
    }
  
  };
  
  export { createProduct };

  //////////////////////////////////////////////////////////
  
  try {
    const { title, slug, category, subcategory } = req.body;
    const { thumbnail, gallery } = req.files;
  
    // Validate thumbnail presence
    if (!thumbnail || !thumbnail[0]?.path) {
      return res.status(400).json(apiResponse(400, 'Thumbnail image is required'));
    }
    const thumbnailImgPath = thumbnail[0].path;
  
    // Generate a unique slug if not provided
    let newSlug;
    if (!slug) {
      newSlug = `${title.replaceAll(' ', '-').toLowerCase()}-${Date.now()}`;
    } else {
      const isSlugUnique = await Product.findOne({ slug });
      if (isSlugUnique) {
        return res.status(400).json(apiResponse(400, 'Slug must be unique'));
      }
      newSlug = `${slug.replaceAll(' ', '-').toLowerCase()}-${Date.now()}`;
    }
  
    // Upload thumbnail image
    const productThumbnailImg = await cloudinaryUpload(thumbnailImgPath, newSlug, 'product');
    console.log("Thumbnail Cloudinary response:", productThumbnailImg);  // Debugging log
  
    // Use secure_url if optimizeUrl is undefined
    const thumbnailUrl = productThumbnailImg?.uploadResult?.secure_url;
    if (!thumbnailUrl) {
      return res.status(500).json(apiResponse(500, 'Failed to upload thumbnail image'));
    }
  
    // Create a new Product instance
    const product = new Product({
      title,
      category,
      subcategory,
      slug: newSlug,
      thumbnail: {
        imagePath: thumbnailUrl,  // Match schema field name
        publicId: productThumbnailImg.uploadResult?.public_id,
      },
      gallery: []
    });
  
    // Upload gallery images if provided
    if (gallery) {
      const galleryImages = gallery.map(file => file.path);
  
      for (let imagePath of galleryImages) {
        const galleryPublicId = imagePath.replace('public/temp/', '').replace(/\.(png|jpg|jpeg|gif|bmp|tiff|webp)$/i, '');
  
        // Upload each gallery image to Cloudinary
        const uploadedGalleryImage = await cloudinaryUpload(imagePath, galleryPublicId, 'product/gallery');
        console.log("Gallery Cloudinary response:", uploadedGalleryImage); // Debugging log
  
        const galleryImageUrl = uploadedGalleryImage?.uploadResult?.secure_url;
        if (galleryImageUrl) {
          product.gallery.push({
            galleryImage: galleryImageUrl,
            publicId: uploadedGalleryImage.uploadResult?.public_id,
          });
        } else {
          console.error(`Failed to upload gallery image: ${imagePath}`);
        }
      }
    }
  
    // Save product to database
    await product.save();
  
    return res.status(201).json(apiResponse(201, 'Product created', { data: product }));
  } catch (error) {
    console.error('Error creating product:', error);
    return res.status(500).json(apiResponse(500, 'Internal server error', { error: error.message }));
  }

*/}



