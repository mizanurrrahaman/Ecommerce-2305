import e from 'express';
import { protectAuth } from '../middlewares/protectAuth.js';
import { adminAuth } from '../middlewares/adminAuth.js';
import { allSubCategories, subCategoryCreate } from '../controllers/subCategory.js';

const router = e.Router()

router.route("/create").post(protectAuth,adminAuth,  subCategoryCreate)
router.route("/").get(allSubCategories)

export default router