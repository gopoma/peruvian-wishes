const client = require("../libs/db");

class UserController {
  static async getAll(req, res) {
    const users = await client.user.findMany();
    const infoMessage = (await req.consumeFlash("info"))[0];
    const errorMessage = (await req.consumeFlash("error"))[0];
    return res.render("admin/users", {
      messages: [
        {
          info: true && infoMessage,
          content: infoMessage
        },
        {
          error: true && errorMessage,
          content: errorMessage
        }
      ],
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

      await req.flash("info", "User edited successfully");
      return res.redirect("/admin/users");
    } catch(error) {
      await req.flash("error", "A wild error has appeared");
      return res.redirect("/admin/users");
    }
  }
}

module.exports = UserController;