const express = require("express");
const path = require("path");
const { engine } = require("express-handlebars");
const { appendFileSync } = require("fs");

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

app.get("/", (req, res) => {
  return res.json({message: "Peruvian Wishes"});
});

// Utilizando los routes
auth(app);

app.listen(port, () => {
  console.log(`Listening on: http://localhost:${port}`);
});