"use strict";

import mongoose from 'mongoose';
import _ from 'lodash';
const EventAuto = mongoose.model('EventAuto');

const eventList = [
  "pageDisappear",
  "pageAppear",
  "buttonClick",
  "gestureTap"
];

class EventAutoController {
  constructor(attributes) {
  };

  static *save(events) {

    if (_.isArray(events) == false) {
      events = _.concat(events,[]);
    }

    _.remove(events, function (n) {
      return _.indexOf(eventList, n['eventKey']) == -1
    });

    try {
      EventAuto.create(events);
    } catch (e) {
      console.error(e);
      console.error(events);
    }
  };
}

module.exports = EventAutoController;
