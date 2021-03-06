const express = require("express");
const UserController = require("../controllers/users");
const authValidation = require("../middleware/authValidation");

function users(app) {
  const router = express.Router();
  app.use("/admin/users", router);
  router.use(authValidation({requiredRole:"ADMIN"}));

  router.get("/", UserController.getAll);
  router.get("/:id", UserController.getOne);
  router.post("/:id/edit", UserController.editOne);
  router.get("/:id/delete", UserController.getDeleteConfirmation);
  router.post("/:id/delete", UserController.deleteOne);
}

module.exports = users;