const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const userRoutes = require('./routes/users.js');
const authControllers = require('./controllers/authControllers.js')
const eventUtiRoutes = require('./routes/eventsUti.js'); //nuevo evento
const eventGuardRoutes = require('./routes/eventsGuard.js')

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  credentials: true,
}));

// Routes
app.use('/api', userRoutes);
app.use('/api', authControllers);
app.use('/api', eventUtiRoutes);
app.use('/api', eventGuardRoutes);

app.get("/", (req, res) => {
  res.send("Welcome");
});

// MongoDB connection
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to Atlas"))
  .catch((error) => console.error(error));

// Start Server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
