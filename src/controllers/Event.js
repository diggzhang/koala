"use strict";

import mongoose from 'mongoose';
import UAParser from 'ua-parser-js';
import _ from 'lodash';
const Event = mongoose.model('Event');
const libqqwry = require('lib-qqwry');
const qqwry = libqqwry.init();
qqwry.speed();
const assert = require('http-assert');

class EventController {
  constructor(attributes) {
    // this.attributes = clone(attributes || {})
  };

  static *save(events, header) {
    let ua = (new UAParser(header.ua)).getResult();
    events.map(item => {
      if (item.platform2 === 'PC') {
        item.deviceAttr = {
          os: ua.os,
          browser: ua.browser
        };
      }
      item.userAttr.ip = header.ip;
      try {
        item.userAttr.ipLocation = qqwry.searchIP(header.ip).Country
      }
      catch(e) {
        // throw new Error(`invalid ip ${header.ip}`)
        console.error(`invalid ip address ${header.ip}`)
      }
    });

    yield Event.create(events);
  };

}

module.exports = EventController;
