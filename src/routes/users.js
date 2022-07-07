const express = require("express");
const UserController = require("../controllers/users");

function users(app) {
  const router = express.Router();
  app.use("/admin/users", router);

  router.get("/", UserController.getAll);
  router.get("/:id", UserController.getOne);
  router.post("/:id/edit", UserController.editOne);
  router.get("/:id/delete", UserController.getDeleteConfirmation);
  router.post("/:id/delete", UserController.deleteOne);
}

module.exports = users;