const client = require("../libs/db");

class AuthController {
  static async showLoginView(req, res) {
    const users = await client.user.findMany();
    console.log(users);
    return res.render("login");
  }
}

module.exports = AuthController;