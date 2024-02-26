const express = require('express');
const eventSchema = require('../Models/eventUtiModel');
const router = express.Router();

// Create event
router.post("/eventsUti", async (req, res) => {
  const { title, date } = req.body;

  try {
    const eventData = {
      title: title,
      date: date,
    };
    const newEvent = new eventSchema(eventData);
    await newEvent.save();
    res.status(201).json({ success: true, message: 'Evento creado exitosamente.' });
  } catch (error) {
    console.error("Error al crear evento:", error);
    res.status(500).json({ success: false, message: 'Error interno del servidor al crear evento.' });
  }
});

// Get events
router.get("/eventsUti", async (req, res) => {
  try {
    const events = await eventSchema.find();
    res.status(200).json({ success: true, events: events });
  } catch (error) {
    console.error("Error al obtener eventos:", error);
    res.status(500).json({ success: false, message: 'Error interno del servidor al obtener eventos.' });
  }
});

module.exports = router;
