const mongoose = require('mongoose');

const eventUtiSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});


module.exports = mongoose.model('EventUti', eventUtiSchema);