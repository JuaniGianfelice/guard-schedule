const express = require('express');
const eventSchema = require('../Models/eventModel');
const router = express.Router();

// Create event
router.post("/events", async (req, res) => {
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

module.exports = router;