const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  user_id:{
    type: String,
    required: true
  },
  hashed_password:{
    type: String,
    require: true
  },
  rol:{
    type: String,
    require:true
  },
  calendar:{
    type: String,
    require:true
  },
});


module.exports = mongoose.model('User', userSchema);