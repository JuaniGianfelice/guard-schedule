const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  user_id:{
    type:string,
    require:true,
  },
  hashed_password:{
    type:string,
    require:true,
  },
  rol:{
    type:string,
    require:true,
  },
  calendar:{
    type:string,
    require:true,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = mongoose.model('User', userSchema);