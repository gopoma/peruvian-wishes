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
        messages: [{error:true, content:"Fill all the fields"}],
        userData: req.body
      });
    }

    if(!password || password !== passwordConfirmation) {
      return res.render("signup", {
        messages: [{error:true, content:"Passwords don't match"}],
        userData: req.body
      });
    }

    try {
      const userSaved = await client.user.create({
        select: {
          id:true,
          username:true,
          email:true,
          role:true
        },
        data: {
          username,
          email,
          birthday: new Date(birthday),
          password: await encrypt(password)
        },
      });

      // When SignUp goes successfully
      req.session.user = {
        loggedIn: true,
        ...userSaved
      };
      await req.flash("info", "User registered successfully");
      return res.redirect("/");
    } catch(error) {
      if(error.code === "P2002") {
        const field = error.meta.target.split("_")[1];
        const repeatedField = field[0].toUpperCase() + field.substring(1, field.length);
        return res.render("signup", {
          messages: [{error:true, content:`${repeatedField} already registered`}],
          userData: req.body
        });
      }
      // Max VARCHAR size exceeded
      return res.render("signup", {
        messages: [{error:true, content:"A wild error has appeared"}],
        userData: req.body
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
      messages: [{error:true, content:"Invalid credentials"}]
    });
  }

  static logOut(req, res) {
    req.session.destroy();
    return res.redirect("/");
  }
}

module.exports = AuthController;