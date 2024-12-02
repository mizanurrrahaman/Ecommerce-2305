import apiResponse from "quick-response"
import { Order } from "../models/orderModel.js"
import { Shipping } from "../models/shippingModel.js"
import {v4 as uuidv4 } from 'uuid';
const createOrder = async (req, res) =>{
    
    try{
        const {total, sebtotal, name, address, city, district, postcode, phone, email, shippingCost, paymentType, ordereproducts, isshipping, sname, saddress, scity, sdistrict, spostcode, sphone, semail} = req.body
        const orderId = uuidv4()
        const orderDeatils = new Order()
        if(isshipping){
            const shippingDeatils = await Shipping.create({ sname, saddress, sdistrict, spostcode, scity, sphone, semail})
            orderDeatils.user = req.user._id
            orderDeatils.orderId = orderId
            orderDeatils.total = total;
            orderDeatils.sebtotal = sebtotal;
            orderDeatils.postcode = postcode;
            orderDeatils.name = name;
            orderDeatils.address = address;
            orderDeatils.city = city;
            orderDeatils.district = district;
            orderDeatils.phone = phone;
            orderDeatils.email = email;
            orderDeatils.shippingCost = shippingCost;
            orderDeatils.paymentType = paymentType;
            orderDeatils.ordereproducts = ordereproducts;
            orderDeatils.shipping = shippingDeatils._id
            await orderDeatils.save()
        } 
        else{
            orderDeatils.user = req.user._id
            orderDeatils.orderId = orderId
            orderDeatils.total = total;
            orderDeatils.sebtotal = sebtotal;
            orderDeatils.postcode = postcode;
            orderDeatils.name = name;
            orderDeatils.address = address;
            orderDeatils.city = city;
            orderDeatils.district = district;
            orderDeatils.phone = phone;
            orderDeatils.email = email;
            orderDeatils.shippingCost = shippingCost;
            orderDeatils.paymentType = paymentType;
            orderDeatils.ordereproducts = ordereproducts;
            //orderDeatils.shipping = shippingDeatils._id
            await orderDeatils.save()
        }

        return res.json(apiResponse(201, "order done", { orderDeatils }))
    } catch(error){
      console.log(error)
    }
} 

const allOrders = async (req, res) =>{
    try {
        const allOrders = await Order.find().populate("user").populate("shipping").populate("ordereproducts.product").populate("ordereproducts.inventory")
        return res.json(apiResponse(200, "all orders", { allOrders}))
    } catch (error) {
        
    }
}

export { createOrder, allOrders }