"use strict";

import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const Mixed = Schema.Types.Mixed;

let eventAutoSchema = new Schema({
  "serverTime": {type: Date, default: Date.now} //Server required, Time recorded by server
}, {"strict": false, "validateBeforeSave":false});

mongoose.model('EventAuto', eventAutoSchema);
