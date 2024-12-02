import e from 'express';
import { protectAuth } from '../middlewares/protectAuth.js';
import { adminAuth } from '../middlewares/adminAuth.js';
import { createCart, updateQuantity } from '../controllers/cardController.js';


const router = e.Router()

router.route("/create").post(adminAuth, createCart)
router.route("/update").post(updateQuantity)

export default router