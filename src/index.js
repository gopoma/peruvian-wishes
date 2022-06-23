const express = require("express");
const path = require("path");
const { engine } = require("express-handlebars");

// Importando las Variables de Entorno
const { port } = require("./config");

// Importando los routes
const auth = require("./routes/auth");

const app = express();

// Configurando el Template Engine
app.engine("hbs", engine({
  extname: "hbs"
}));

app.set("view engine", "hbs");
app.set("views", path.resolve(__dirname, "views"));

// Middleware
app.use(express.static(path.join(__dirname, "static")));
app.use(express.urlencoded({extended:true}));

app.get("/", (req, res) => {
  return res.render("home", {
    user: {
      loggedIn: 1,
      name: "Gustavo"
    },
    programmingLanguages: [
      "JavaScript",
      "Python",
      "Java",
      "Perl",
      "C++",
      "TypeScript"
    ]
  });
});

// Utilizando los routes
auth(app);

app.listen(port, () => {
  console.log(`Listening on: http://localhost:${port}`);
});