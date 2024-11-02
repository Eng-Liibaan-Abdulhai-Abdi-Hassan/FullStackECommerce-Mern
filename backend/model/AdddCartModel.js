const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const addcartschema = new Schema(
  {
    ProductID: {
      type: Schema.Types.ObjectId,
      ref: "product",
    },
    UserID: String,
    Quantity: Number,
  },
  { timestamps: true }
);
module.exports = model("addcart", addcartschema);
