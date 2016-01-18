"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

/**
 * Count Schema
 */

var sessionSchema = new Schema({
  value: { type: Number, default: 0 },
  updated: { type: Date, default: Date.now },
  created: { type: Date, default: Date.now },
  userAction: { type: String }
});

sessionSchema.pre("save", function(next) {
  this.updated = new Date();
  next();
});

mongoose.model("Session", sessionSchema);
