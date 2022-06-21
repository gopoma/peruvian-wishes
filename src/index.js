const express = require("express");

// Importando las Variables de Entorno
const { port } = require("./config");

const app = express();

app.get("/", (req, res) => {
  return res.json({message: "Peruvian Wishes"});
});

app.listen(port, () => {
  console.log(`Listening on: http://localhost:${port}`);
});