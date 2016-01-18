"use strict";
var mongoose = require("mongoose");
var Session = mongoose.model("Session");

exports.getSession = function *() {
  var session = yield Session.findOne().exec();
  if(!session) {
    session = new Session();
  };

  this.body = {sessionInfo: session};
};

exports.updateSession = function *() {
  var session = yield Session.findOne().exec();
  if(!session) {
    session = new Session();
  };
  session.updated = new Date();
  yield session.save();
  this.body = {sessionInfo: session};
};
