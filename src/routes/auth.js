const express = require("express");
const AuthController = require("../controllers/auth");

function auth(app) {
  const router = express.Router();
  app.use("/auth", router);

  router.get("/login", AuthController.showLoginView);
}

module.exports = auth;