var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var PointSchema = new Schema({
  eventKey: String,
  eventValue: {},
  header: {},
  user: { type: ObjectId },
  chapter: { type: ObjectId },
  room: { type: ObjectId },
  topic: { type: ObjectId },
  task: { type: ObjectId },
  activity: { type: ObjectId },
  video: { type: ObjectId },
  problem: { type: ObjectId },
  school: { type: ObjectId },
  tag: { type: ObjectId },
  url: String,
  createdBy: {
    type: Date,
    default: Date.now
  },
  from: {
    type: String,
    default: 'pc'
  }
}, {"strict": false, "validateBeforeSave":false});

mongoose.model('Point', PointSchema);