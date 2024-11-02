const express = require("express");
const OrderController = require("../controller/OrderController");
const Protocol = require("../middleware/Protocol");
const router = express.Router();
router.get("/allorders", OrderController.GetAllOrders);
router.get("/GetOrder", Protocol, OrderController.GetOrder);
router.post("/orderpayment", Protocol, OrderController.OrderPayment);
router.post("/GetOrderPayment", OrderController.GetOrderPayment);
module.exports = router;
