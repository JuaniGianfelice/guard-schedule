require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

mongoose.connect(
  process.env.MONGODB_URI,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  () => console.log("Conected to MongoDB")
);

app.use("/api/calendar", require("./Controllers/calendarController"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

