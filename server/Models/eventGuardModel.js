const mongoose = require('mongoose');

const eventGuardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});


module.exports = mongoose.model('EventGuard', eventGuardSchema);