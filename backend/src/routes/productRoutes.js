import e from 'express';
import { createProduct, delateProduct, pagination } from '../controllers/productController.js';
import { upload } from '../middlewares/uploadImage.middleware.js';


const router = e.Router()

router.route("/products/create").post( upload.fields([{ name: "thumbnail", maxCount:1}, { name: "gallery", maxCount: 4}]),  createProduct)
router.route("/delate/:id").delete(delateProduct)
router.route("/").get(pagination)


export default router