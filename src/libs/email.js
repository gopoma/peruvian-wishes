const nodemailer = require("nodemailer");
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

transporter.verify(function(error, success) {
  if(success) {
    console.log("Server is ready to take our messages");
  } else {
    console.log(error);
  }
});

module.exports = transporter;