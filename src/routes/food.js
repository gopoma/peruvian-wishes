const express = require("express");
const authValidation = require("../middleware/authValidation");
const FoodController = require("../controllers/food");

function food(app) {
  const router = express.Router();
  app.use("/food", router);
  router.use(authValidation({requiredRole:"ADMIN", excent:["/"]}));

  router.get("/", FoodController.getAll);
  router.get("/addFood", FoodController.getAddForm);
  router.post("/addFood", FoodController.add);
  router.post("/addCategory", FoodController.addCategory);
  router.get("/:idFood/edit", FoodController.getEditForm);
  router.post("/:idFood/edit", FoodController.edit);
  router.get("/:idFood/delete", FoodController.getDeleteConfirmation);
  router.post("/:idFood/delete", FoodController.delete);
}

module.exports = food;