import e from 'express';
import { protectAuth } from '../middlewares/protectAuth.js';
import { adminAuth } from '../middlewares/adminAuth.js';

const router = e.Router()

router.route("/categories/create").post(protectAuth,adminAuth)


export default router