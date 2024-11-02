const express = require("express");
const AddCartController = require("../controller/AddCartController");
const Protocol = require("../middleware/Protocol");
const router = express.Router();
router
  .get("/allAddCarts", Protocol, AddCartController.GetAllAddCarts)
  .get("/AddCartCount", Protocol, AddCartController.AddCartCount)
  .post("/signup", Protocol, AddCartController.SignUpAddCart)
  .put("/update", Protocol, AddCartController.UpdateAddCart)
  .delete("/delete/:id", Protocol, AddCartController.DeleteAddCart);
module.exports = router;
