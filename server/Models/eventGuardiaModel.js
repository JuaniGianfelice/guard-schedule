const mongoose = require('mongoose');

const eventGuardiaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});


module.exports = mongoose.model('EventGuardia', eventGuardiaSchema);