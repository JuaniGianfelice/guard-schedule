const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const userRoutes = require("./routes/users.js");
const loginRoutes = require("./routes/login.js")

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
}));
app.use('/api', userRoutes);
app.use('/api', loginRoutes);

// Routes
app.get("/", (req, res) => {
  res.send("Hi, Welcome");
});

// MongoDB connection
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Conected to Atlas"))
  .catch((error) => console.error(error));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
