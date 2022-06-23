const client = require("../libs/db");
const { encrypt } = require("../helpers/encrypt");

class AuthController {
  static async getSignUpForm(req, res) {
    return res.render("signup");
  }
  static async signUp(req, res) {
    const { 
      username, 
      email, 
      birthday, 
      password, 
      passwordConfirmation 
    } = req.body;

    if(!password || password !== passwordConfirmation) {
      return res.render("signup");
    }

    try {
      const userSaved = await client.user.create({
        data: {
          username,
          email,
          birthday: new Date(birthday),
          password: await encrypt(password)
        },
      });

      req.session.user = {
        loggedIn: true,
        ...userSaved
      };
      return res.redirect("/");
    } catch(error) {
      console.log(error);
      return res.render("signup");
    }
  }

  static async getLoginForm(req, res) {
    const users = await client.user.findMany();
    console.log(users);
    return res.render("login");
  }
  static async logIn(req, res) {
    return res.json(req.body);
  }
}

module.exports = AuthController;