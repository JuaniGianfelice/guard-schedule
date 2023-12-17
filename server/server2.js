const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const userRoutes = require ("./routes/users.js")

const app = express();
const PORT = process.env.PORT || 8000;

//middleware
app.use(express.json())
app.use('/api', userRoutes)

//routes
app.get("/", (req, res) => {
  res.send("Hola, Bienvenido");
});

//mongodb conection
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Conected to Atlas"))
  .catch((error) => console.error(error));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


