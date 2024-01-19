const express = require('express');
const eventController = require('../Controllers/calendarController');
const router = express.Router();

router.post('/events', eventController.createEvent);
router.get('/events/:calendar', eventController.getEvents);

module.exports = router;
