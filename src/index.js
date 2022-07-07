const express = require("express");
const path = require("path");
const { engine } = require("express-handlebars");
const session = require("express-session");
const { flash } = require("express-flash-message");

// Importando las Variables de Entorno
const { port, sessionSecret } = require("./config");

// Importando los routes
const auth = require("./routes/auth");
const users = require("./routes/users");
// Importando los middlewares
const addSessionToTemplate = require("./middleware/addSessionToTemplate");

const app = express();

// Importando los helpers
const { parseDate } = require("./helpers/date");
// Configurando el Template Engine
app.engine("hbs", engine({
  extname: "hbs",
  helpers: {
    parseDate
  }
}));

app.set("view engine", "hbs");
app.set("views", path.resolve(__dirname, "views"));

// Middleware
app.use(express.static(path.join(__dirname, "static")));
app.use(express.urlencoded({extended:true}));
app.use(session({
  secret: sessionSecret,
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
}));
app.use(flash({ sessionKeyName: "flashMessage" }));
app.use(addSessionToTemplate);


// Utilizando los routes
auth(app);
users(app);

const client = require("./libs/db");
app.get("/", async (req, res) => {
  const infoMessage = (await req.consumeFlash("info"))[0];
  console.log(req.session);
  return res.render("home", {
    messages: [
      {
        info: true && infoMessage, 
        content: infoMessage
      }
    ],
    users: await client.user.findMany()
  });
});

app.get("/not-allowed", (req, res) => res.render("not_allowed"));
app.all("*", (req, res) => res.render("not_found"));

app.listen(port, () => {
  console.log(`Listening on: http://localhost:${port}`);
});