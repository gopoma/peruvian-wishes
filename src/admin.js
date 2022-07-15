const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const client = require("./libs/db");
const { encrypt } = require("./helpers/encrypt");

rl.question("Enter a username: ", function(username) {
  rl.question("Enter a email: ", function(email) {
    rl.question("Enter a password: ", function(password) {
      rl.question("Confirm your password: ", async function(passwordConfirmation) {
        try {
          if(password !== passwordConfirmation) {
            process.stderr.write("Passwords don't match");
            process.exit(1);
          }
          await client.user.create({
            data: {
              username,
              email,
              password: await encrypt(password),
              role: "ADMIN"
            }
          });
          rl.close();
        } catch(error) {
          process.stderr.write("Passwords don't match");
          process.exit(1);
        }
      });
    });
  });
}); 

rl.on("close", function() {
  console.log("Admin added!");
  process.exit(0);
});