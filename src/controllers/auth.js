class AuthController {
  static showLoginView(req, res) {
    return res.json({success:true});
  }
}

module.exports = AuthController;