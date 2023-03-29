const client = require("../libs/db");
const { encrypt, compare } = require("../helpers/encrypt");
const transporter = require("../libs/email");

class AuthController {
  static getSignUpForm(req, res) {
    return res.render("signup");
  }
  static async signUp(req, res) {
    try {
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

      const userSaved = await client.user.create({
        data: {
          username,
          email,
          birthday: new Date(birthday),
          password: await encrypt(password),
          orders: {
            create: {
              completed: false
            }
          },
        },
        include: {
          orders: true
        }
      });

      const userWithOrder = await client.user.update({
        data: {
          activeOrder: userSaved.orders[0].id
        },
        where: {
          id: userSaved.id
        }
      });

      // When SignUp goes successfully
      delete userWithOrder.password;
      req.session.user = {
        loggedIn: true,
        ...userWithOrder
      };

      transporter.sendMail({
        from: "'gopoma 😊' <GustavoEdu10111213@gmail.com>",
        to: req.session.user.email,
        subject: "Your registration has been successfully completed 😊!",
        template: "completed_signup",
        context: {
          customer: req.session.user
        }
      });

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