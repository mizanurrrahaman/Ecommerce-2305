import mongoose, { Schema } from "mongoose";

const orderModel = new Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    country: {
      type: String,
      default: "Bangladesh",
    },
    orderId: {
      type: Number, // Corrected from "Type" to "type"
      unique: true,
    },
    total: Number,
    sebtotal: Number,
    name: String,
    address: String,
    city: String,
    district: String,
    postcode: String,
    phone: String,
    email: String,
    shippingCost: Number,
    paymentType: {
      type: String,
      enum: ["cod", "online"],
    },
    orderStatus: {
      type: String,
      enum: [
        "pending",
        "confirm",
        "processing",
        "shipping",
        "delivered",
        "returned",
        "cancelled",
      ],
    },
    returnInfo: String,
    isshipping: {
      type: Boolean,
      default: false,
    },
    shipping: {
      type: mongoose.Types.ObjectId,
      ref: "Shipping",
    },
    ordereproducts: [
      {
        product: {
          type: mongoose.Types.ObjectId,
          ref: "Product",
        },
        inventory: {
          type: mongoose.Types.ObjectId,
          ref: "Inventory",
        },
        price: Number,
        quantity: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Order = mongoose.model("Order", orderModel);


{/*

    import mongoose, { Schema } from "mongoose";
     
    
    const orderModel = new Schema({
    
        user:{
            type: mongoose.Types.ObjectId,
            ref: "User"
        },
        country: {
            type: String,
            default: "Bangladesh"
        },
        orderId: {
           Type: Number,
           unique: true
        },
        total: Number,
        sebtotal: Number,
        name: String,
        address: String,
        city: String,
        district: String,
        postcode: String,
        phone: String,
        email: String,
        shippingCost: Number,
        paymentType:{
            type: String,
            enum: ["cod", "online"],
        },
        orderStatus:{
            type: String,
            enum: ["pending","confirm", "proccesing", "shipping", "delivered", "returned", "cancelled"],
        },
        returnInfo: String,
        isshipping:{
          type: Boolean,
          default: false
        },
        shipping:{
            type: mongoose.Types.ObjectId,
            ref: "Shipping"
         },
        ordereproducts: [
            {
    
                productDetails:{
                  type: mongoose.Types.ObjectId,
                  ref: "Product"
                },
                inventory: {
                    type: mongoose.Types.ObjectId,
                    ref: "Inventory" 
                },
                price: Number,
                quantity: Number
            }
        ] 
    
    },{
        timestamps: true,
    })
    
    
    export const Order = mongoose.model("Order", orderModel)
*/}
