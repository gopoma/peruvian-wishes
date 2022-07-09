const express = require("express");
const authValidation = require("../middleware/authValidation");
const OrderController = require("../controllers/orders");

function orders(app) {
  const router = express.Router();
  app.use("/orders", router);
  router.use(authValidation({requiredRole:"REGULAR"}));

  router.get("/", OrderController.getCurrentOrder);
  router.post("/complete", OrderController.makeOrderComplete);
  router.get("/completed", OrderController.getCompletedOrders);
  router.post("/:idFood/add", OrderController.addFood);
  router.post("/:idFood/delete", OrderController.deleteFood);
}

module.exports = orders;