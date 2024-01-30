const express = require('express');
const eventSchema = require('../Models/eventModel');
const User = require('../Models/userModel');

const createEvent = async (req, res) => {
  const { title, date } = req.body;

  try {
    const user = req.user;

    const newEvent = new eventSchema({
      title,
      date,
      calendarType: user.calendar,
    });

    await newEvent.save();
    res.status(201).json({ success: true, message: 'Evento creado exitosamente' });
  } catch (error) {
    console.error('Error al crear el evento:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor al crear el evento.' });
  }
};

const getEvents = async (req, res) => {
  try {
    const user = req.user;

    const events = await eventSchema.find({ calendarType: user.calendar });
    res.status(200).json(events);
  } catch (error) {
    console.error('Error al obtener eventos:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor al obtener eventos.' });
  }
};

module.exports = { createEvent, getEvents };




/*

// Crear un nuevo evento
router.post('/events', async (req, res) => {
  const { title, date, calendar } = req.body;

  try {
    const newEvent = new eventSchema({
      title,
      date,
      calendar,
    });

    await newEvent.save();
    res.status(201).json({ success: true, message: 'Evento creado exitosamente' });
  } catch (error) {
    console.error('Error al crear el evento:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor al crear el evento.' });
  }
});

// Obtener eventos por calendario
router.get('/events/:calendar', async (req, res) => {
  const calendar = req.params.calendar;

  try {
    const events = await eventSchema.find({ calendar });
    res.status(200).json(events);
  } catch (error) {
    console.error('Error al obtener eventos:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor al obtener eventos.' });
  }
});

*/
