"use strict";

import mongoose from 'mongoose';
const EventAuto = mongoose.model('EventAuto');

class EventAutoController {
  constructor(attributes) {
    // this.attributes = clone(attributes || {})
  };

  static *save(events) {
    console.info(events);

    try {
      EventAuto.create(events);
    } catch (e) {
      console.error(e);
      console.error(events);
    }
  };
}

module.exports = EventAutoController;
