// eventUti.js
const express = require('express');
const EventUti = require('../Models/eventUtiModel');
const { createEvent, getEvents } = require('../controllers/eventController');
const router = express.Router();

router.post("/:type/events", async (req, res) => {
  const { type } = req.params;
  const { title, date } = req.body;
  const eventData = { title, date };
  const result = await createEvent(EventUti, eventData);
  res.status(result.success ? 201 : 500).json(result);
});

router.get("/:type/events", async (req, res) => {
  const { type } = req.params;
  const result = await getEvents(EventUti);
  res.status(result.success ? 200 : 500).json(result);
});

module.exports = router;
