const client = require("../libs/db");

class UserController {
  static async getAll(req, res) {
    const users = await client.user.findMany();
    
    return res.render("admin/users", {
      users
    });
  }

  static async getOne(req, res) {
    const {id} = req.params;
    const user = await client.user.findUnique({
      where: {
        id: parseInt(id)
      }
    });

    if(!user) {
      return res.render("not_found");
    }

    return res.render("admin/user_details", {
      user
    });
  }

  static async editOne(req, res) {
    const {id} = req.params;
    req.body.active = req.body.active === "on";
    req.body.birthday = new Date(req.body.birthday);

    try {
      await client.user.update({
        data: req.body,
        where: {
          id: parseInt(id)
        }
      });

      await req.flash("success", "User edited successfully");
      return res.redirect("/admin/users");
    } catch(error) {
      return res.render("admin/user_details", {
        displayMessages: true,
        success: false,
        messages: ["A wild error has appeared"]
      });
    }
  }
}

module.exports = UserController;