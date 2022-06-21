class AuthController {
  static showLoginView(req, res) {
    return res.render("login");
  }
}

module.exports = AuthController;