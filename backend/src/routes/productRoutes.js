import e from 'express';
import { createProduct } from '../controllers/productController.js';
import { upload } from '../middlewares/uploadImage.middleware.js';


const router = e.Router()

router.route("/create").post( upload.fields([{ name: "thumbnail", maxCount:1}, { name: "gallery", maxCount: 4}]),  createProduct)


export default router