const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Schema
 */

let countSchema = new Schema({
  value: {type: Number, default: 0},
  updated: {type: Date, default: Date.now}
});

countSchema.pre("save", function (next) {
  this.updated = new Date();
  next();
});

mongoose.model('Count', userSchema);