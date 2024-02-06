const express = require('express');
const eventController = require('../controllers/calendarController');
const { authenticateUser } = require('../middlewares/authMiddlewares');
const router = express.Router();


router.post('/events', authenticateUser, eventController.createEvent);
router.get('/events', authenticateUser, eventController.getEvents);

module.exports = router;
