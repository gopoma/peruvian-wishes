const client = require("../libs/db");
const { encrypt, compare } = require("../helpers/encrypt");

class AuthController {
  static getSignUpForm(req, res) {
    return res.render("signup");
  }
  static async signUp(req, res) {
    const { username, email, birthday, password, passwordConfirmation } = req.body;

    if(!username || !email || !password || !passwordConfirmation) {
      return res.render("signup", {
        displayMessages: true,
        success: false,
        messages: ["Fill all the fields"]
      });
    }

    if(!password || password !== passwordConfirmation) {
      return res.render("signup", {
        displayMessages: true,
        success: false,
        messages: ["Passwords don't match"]
      });
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
      if(error.code === "P2002") {
        const field = error.meta.target.split("_")[1];
        const repeatedField = field[0].toUpperCase() + field.substring(1, field.length);
        return res.render("signup", {
          displayMessages: true,
          success: false,
          messages: [`${repeatedField} already registered`]
        });
      }
      // Max VARCHAR size exceeded
      return res.render("signup", {
        displayMessages: true,
        success: false,
        messages: ["A wild error has appeared"]
      });
    }
  }

  static getLoginForm(req, res) {
    return res.render("login");
  }
  static async logIn(req, res) {
    const { email, password } = req.body;
    const user = await client.user.findUnique({
      where: {
        email
      }
    });

    if(user && await compare(password, user.password)) {
      delete user.password;
      req.session.user = {
        loggedIn: true,
        ...user
      };
      return res.redirect("/");
    }

    return res.render("login", {
      error: true,
      message: "Invalid credentials"
    });
  }
}

module.exports = AuthController;