const express = require("express");
const UserController = require("../controller/UserController");
const Protocol = require("../middleware/Protocol");
const router = express.Router();
router
  .get("/allusers", Protocol ,UserController.GetAllUsers)
  .get("/singleuser", UserController.GetSignleUser)
  .post("/signup", UserController.SignUpUser)
  .post("/login", UserController.Login)
  .post("/VerityOTP", UserController.VerityOTP)
  .post("/Logout", UserController.Logout)
  .post("/Change", UserController.Change)
  .put("/update", UserController.UpdateUser)
  .delete("/delete/:id", UserController.DeleteUser);
module.exports = router;
