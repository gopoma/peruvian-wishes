const express = require("express");
const AuthController = require("../controllers/auth");

function auth(app) {
  const router = express.Router();
  app.use("/auth", router);

  router.get("/signup", AuthController.getSignUpForm);
  router.post("/signup", AuthController.signUp);
  router.get("/login", AuthController.getLoginForm);
  router.post("/login", AuthController.logIn);
  router.get("/logout", AuthController.logOut);
}

module.exports = auth;