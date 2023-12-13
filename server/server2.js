const express = require("express");
const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;

//routes
app.get("/users", (req, res) => {
  res.send("Hola, Bienvenido");
});

//mongodb conection
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Conected to Atlas"))
  .catch((error) => console.error(error));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


