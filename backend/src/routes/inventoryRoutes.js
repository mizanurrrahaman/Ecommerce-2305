import e from 'express';
import { protectAuth } from '../middlewares/protectAuth.js';
import { adminAuth } from '../middlewares/adminAuth.js';
import { allInventory, createInventory, delateById, updateInventory } from '../controllers/inventoryController.js';

const router = e.Router()

router.route("/create").post(protectAuth, adminAuth, createInventory)
router.route("/update/:id").post(protectAuth, adminAuth, updateInventory)
router.route("/").get(protectAuth, adminAuth, allInventory)
router.route("/:id").delete(protectAuth, adminAuth, delateById)
export default router