require("dotenv").config();

const config = {
  port: process.env.PORT,
  sessionSecret: process.env.SESSION_SECRET,
  emailHost: process.env.EMAIL_HOST,
  emailPort: process.env.EMAIL_PORT,
  emailUsername: process.env.EMAIL_USERNAME,
  emailPassword: process.env.EMAIL_PASSWORD
};

module.exports = config;