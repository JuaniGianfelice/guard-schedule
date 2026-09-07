const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const userRoutes = require('./routes/users.js');
const authControllers = require('./Controllers/authControllers.js');
const eventUtiRoutes = require('./routes/eventsUti.js');
const eventGuardRoutes = require('./routes/eventsGuard.js');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  credentials: true,
}));

app.use('/api', userRoutes);
app.use('/api', authControllers);
app.use('/api', eventUtiRoutes);
app.use('/api', eventGuardRoutes);

module.exports = app;