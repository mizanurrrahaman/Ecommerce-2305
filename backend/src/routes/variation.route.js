import e from 'express';
import { protectAuth } from '../middlewares/protectAuth.js';
import { adminAuth } from '../middlewares/adminAuth.js';
import { createVariation } from '../controllers/variationController.js';

const router = e.Router()

router.route("/categories/create").post(protectAuth, adminAuth, createVariation)



export default router