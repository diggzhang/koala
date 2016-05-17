"use strict";

import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const Mixed = Schema.Types.Mixed;

let event35Schema = new Schema({
  "eventKey": {type: String, required: true},
  "eventValue": {type: Mixed},
  "device": String, //Required, unique id for pc, imei for android, idfa for ios
  "deviceOld": String,
  "deviceAttr": {type: Mixed},
  "ua": String, //server do it
  "url": String,
  "channel": String,
  "category": String, // to string
  //"platform": {type: String, enum: ["web", "app", "share", "m", "promotion", "vs", "backend"]}, //Required
  "platform": {type: String, default: null}, //Required
  "os": {type: String, enum: ["pc", "android", "ios"]},
  "ip": String, //server do it
  "location": {type: Mixed, default: null}, // server do it
  "user": {type:ObjectId, default: null}, //Required when user logged in, its user id
  //"role": {"type": String, "enum": ["teacher", "student", "editor", "visitor"]},
  "role": {"type": String, default: null},
  "eventTime": {type: Number, required: true}, //Required, timeStamp of points generated, unix epoch time (in ms)
  "serverTime": {type: Date, default: Date.now} //Server required, Time recorded by server
});

mongoose.model('Event35', event35Schema);
