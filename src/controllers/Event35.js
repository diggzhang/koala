"use strict";

import mongoose from 'mongoose';
import _ from 'lodash';
const Event35 = mongoose.model('Event35');
const libqqwry = require('lib-qqwry');
const qqwry = libqqwry.init();
qqwry.speed();
const assert = require('http-assert');

class Event35Controller {
  constructor(attributes) {
    // this.attributes = clone(attributes || {})
  };

  static *save(events, header) {
    events.map(item => {
      assert(_.includes(['web', 'app', 'share', 'm', 'promotion', 'vs', 'backend'], item.platform),
        400, 'invalid platform param');
      assert(item.eventKey, 400, 'invalid eventKey param');
      assert(item.eventTime, 400, 'invalid eventTime param');
      item.ua = header.ua;
      item.ip = header.ip;
      try {
        item.location = qqwry.searchIP(header.ip).Country
      }
      catch(e) {
        console.error(`invalid ip address ${header.ip}`)
      }
    });

    yield Event35.create(events);
  };
}

module.exports = Event35Controller;
