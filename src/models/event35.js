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
  "deviceAttr": {
    "os": {
      "name": String, //Required, operating system name macos/linux/win for pc, android/ios/win for mobile
      "version": String //Conditional optional, os version code
    },
    "model": {  //App conditional optional, mobile model information
      "brand": String ,
      "name": String
    },
    "appVersion": String
  },
  "ua": String,
  "url": String, //only for pc, the full url
  "channel": String,
  "category": String, // to string
  "platform": {type: String, enum: ["web", "app", "share", "m", "promotion", "vs", "backend"]}, //Required
  "os": {type: String, enum: ["pc", "android", "ios"]},
  "ip": String,
  "location": {type: Mixed, default: null},
  "user": ObjectId, //Required when user logged in, its user id
  "role": {"type": String, "enum": ["teacher", "student", "editor", "visitor"]},
  "eventTime": {type: Number, required: true}, //Required, timeStamp of points generated, unix epoch time (in ms)
  "serverTime": {type: Date, default: Date.now} //Server required, Time recorded by server
});

mongoose.model('Event35', event35Schema);
