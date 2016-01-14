const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  name: {type: String, maxlength: 60},
  password: {type: String}
});

mongoose.model('User', userSchema);