const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");
const {
  emailHost,
  emailPort,
  emailUsername,
  emailPassword
} = require("../config");

const transporter = nodemailer.createTransport({
  host: emailHost,
  port: emailPort,
  auth: {
    user: emailUsername,
    pass: emailPassword
  }
});

transporter.use("compile", hbs({
  viewEngine: {
    extname: ".hbs",
    defaultLayout: false
  },
  viewPath: path.join(__dirname, "..", "views", "emails"),
  extName: ".hbs",
}));

transporter.verify(function(error, success) {
  if(success) {
    console.log("Server is ready to take our messages");
  } else {
    console.log(error);
  }
});

module.exports = transporter;