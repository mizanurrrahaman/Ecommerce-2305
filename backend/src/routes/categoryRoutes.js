import e from 'express';
import { protectAuth } from '../middlewares/protectAuth.js';
import { adminAuth } from '../middlewares/adminAuth.js';
import { categoryCreate } from '../controllers/categoryController.js';

const router = e.Router()

router.route("/create").post(protectAuth,adminAuth,  categoryCreate)

//router.route("/categories/create").post(protectAuth,adminAuth, (req, res) =>{
  //  res.send("created")
//})

export default router