const config = {
  port: process.env.PORT || "4000",
  sessionSecret: process.env.SESSION_SECRET,
  emailHost: process.env.EMAIL_HOST,
  emailPort: process.env.EMAIL_PORT,
  emailSecure: process.env.EMAIL_SECURE,
  emailUsername: process.env.EMAIL_USERNAME,
  emailPassword: process.env.EMAIL_PASSWORD
};

module.exports = config;