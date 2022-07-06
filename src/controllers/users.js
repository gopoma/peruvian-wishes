const client = require("../libs/db");

class UserController {
  static async getAll(req, res) {
    const users = await client.user.findMany();
    
    return res.render("admin/users.hbs", {
      users
    });
  }
}

module.exports = UserController;