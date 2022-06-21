const express = require("express");

// Importando las Variables de Entorno
const { port } = require("./config");

// Importando los routes
const auth = require("./routes/auth");

const app = express();

app.get("/", (req, res) => {
  return res.json({message: "Peruvian Wishes"});
});

// Utilizando los routes
auth(app);

app.listen(port, () => {
  console.log(`Listening on: http://localhost:${port}`);
});