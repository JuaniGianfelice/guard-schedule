const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;

//routes
app.get("/", (req, res) => {
  res.send("Hola, Bienvenido");
});

//mongodb conection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Conected to Atlas"))
  .catch((error) => console.error(error));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
