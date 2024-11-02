const express = require("express");
const CategoryController = require("../controller/CategoryController");
const router = express.Router();
router
  .get("/allCategorys", CategoryController.GetAllCategorys)
  .get("/singleCategory", CategoryController.GetSignleCategory)
  .post("/signup", CategoryController.SignUpCategory)
  .put("/update", CategoryController.UpdateCategory)
  .delete("/delete/:id", CategoryController.DeleteCategory);
module.exports = router;
