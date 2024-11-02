const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const productschema = new Schema(
  {
    ProductName: String,
    ProductBrand: String,
    Category: String,
    ProductImage: [],
    Price: Number,
    SellingPrice: Number,
    Description: String,
  },
  { timestamps: true }
);
module.exports = model("product", productschema);
