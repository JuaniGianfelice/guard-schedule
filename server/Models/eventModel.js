const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  calendar: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Event', eventSchema);
