const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const categoryschema = new Schema(
  {
    Category: String,
  },
  { timestamps: true }
);
module.exports = model("category", categoryschema);
