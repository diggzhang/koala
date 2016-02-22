"use strict";

import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const Mixed = Schema.Types.Mixed;

let eventSchema = new Schema({
  "eventKey": {type: String, required: true},
  "category": {type: String, required: true, enum: ["site", "course", "video", "problem"]},
  "eventValue": {type: Mixed},
  "eventTime": {type: Number, required: true}, //Required, timeStamp of points generated, unix epoch time (in ms)
  "serverTime": {type: Date, default: Date.now}, //Server required, Time recorded by server
  "device": String, //Required, unique id for pc, imei for android, idfa for ios
  "deviceAttr": {
    "imei": String, //Android app required, device imei
    "idfv": String, //iOS app required, device idfv
    "idfa": String, //iOS app required, device idfa
    "version": String, //App required, app version name
    "os": {
      "name": {type: String, required: true}, //Required, operating system name macos/linux/win for pc, android/ios/win for mobile
      "version": String //Conditional optional, os version code
    },
    "model": {  //App conditional optional, mobile model information
      "brand": String ,
      "name": String
    },
    "browser": { //Non-app required, browser type and version info
      "name": String,
      "version": String
    }
  },
  "user": ObjectId, //Required when user logged in, its user id
  "userAttr": {
    "type": {type: String},
    "isRegistered": Boolean, //Required, True for login user
    "registDate": {type: Date, default: Date.now}, //Conditional optional, required if "isRegistered" is true, user's date of registration
    "activateDate": {type: Date}, //Conditional
    "from": String, // Conditional optional, required if "isRegistered" is true, user's from attr
    "role": {"type": String, "enum": ["teacher", "student"]},
    "ip": String,
    "ipLocation": String, // from pureQQ
    "school": ObjectId, //only for users who registered his/her school
    "schoolLocation": {
      "region0": String,
      "region1": String
    }
  },
  "url": String, //only for pc, the full url
  "platform": {"type": String, enum: ["web", "app", "share", "landing", "promotion", "vs"]}, //Required
  "platform2": {"type": String, enum: ["PC", "android", "iOS"]}, //Required
  "q": String,
  "webChannel": String
});

mongoose.model('Event', eventSchema);
