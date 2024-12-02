import e from "express";
import { adminAuth } from "../middlewares/adminAuth.js";
import { allOrders, createOrder } from "../controllers/orderController.js";


const router = e.Router()

router.route("/create").post(adminAuth, createOrder)
router.route("/").get(adminAuth, allOrders)

export default router