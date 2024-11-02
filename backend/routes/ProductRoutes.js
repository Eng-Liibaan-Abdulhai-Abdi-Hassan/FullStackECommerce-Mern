const express = require("express");
const ProductController = require("../controller/ProductController");
const router = express.Router();
router
  .get("/allproducts", ProductController.GetAllProducts)
  .get("/singleproduct/:id", ProductController.GetSignleProduct)
  .get("/SearchProduct", ProductController.SearchProduct)
  .post("/signup", ProductController.SignUpProduct)
  .put("/update", ProductController.UpdateProduct)
  .delete("/delete/:id", ProductController.DeleteProduct);
module.exports = router;
