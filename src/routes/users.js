const express = require("express");
const UserController = require("../controllers/users");

function users(app) {
  const router = express.Router();
  app.use("/admin/users", router);

  router.get("/", UserController.getAll);
}

module.exports = users;