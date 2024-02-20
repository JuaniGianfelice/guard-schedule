// eventGuardia.js
const express = require('express');
const EventGuardia = require('../Models/eventGuardiaModel');
const { createEvent, getEvents } = require('../controllers/eventController');
const router = express.Router();

router.post("/:type/events", async (req, res) => {
  const { type } = req.params;
  const { title, date } = req.body;
  const eventData = { title, date };
  const result = await createEvent(EventGuardia, eventData);
  res.status(result.success ? 201 : 500).json(result);
});

router.get("/:type/events", async (req, res) => {
  const { type } = req.params;
  const result = await getEvents(EventGuardia);
  res.status(result.success ? 200 : 500).json(result);
});

module.exports = router;
