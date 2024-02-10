const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  user:{
    type: String,
    required: true,
    trim: true    
  },
  hashed_password:{
    type: String,
    require: true
  },
  rol:{
    type: String,
    require:true
  },
  calendar_type:{
    type: String,
    require:true
  },
});

module.exports = mongoose.model('User', userSchema);