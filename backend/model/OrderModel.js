const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const orderschema = new Schema(
  {
    productDetails: {
      type: Array,
      default: [],
    },
    email: {
      type: String,
      default: "",
    },
    userId: {
      type: String,
      default: "",
    },
    paymentDetails: {
      paymentId: {
        type: String,
        default: "",
      },
      payment_method_type: [],
      payment_status: {
        type: String,
        default: "",
      },
    },
    TotalAmount: {
      type: Number,
      default: "",
    },
  },
  { timestamps: true }
);
module.exports = model("order", orderschema);
