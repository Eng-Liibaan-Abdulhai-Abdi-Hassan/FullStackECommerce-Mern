const express = require("express");
const ProductCategory = require("../controller/ProductCategory");
const Protocol = require("../middleware/Protocol");
const router = express.Router();
router
  .get("/GetAllProductCategory", ProductCategory.GetAllProductCategory)
  .post("/GetProductCategory", ProductCategory.GetProductCategory)

module.exports = router;
