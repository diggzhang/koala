"use strict";

import mongoose from 'mongoose';
import UAParser from 'ua-parser-js';
import _ from 'lodash';
const Event = mongoose.model('Event');
const qqwry = require('lib-qqwry').info();
const assert = require('http-assert');

class EventController {
  constructor(attributes) {
    // this.attributes = clone(attributes || {})
  };

  static *save(events, header) {
    let ua = (new UAParser(header.ua)).getResult();
    events.map(item => {
      assert(_.includes(['web', 'app', 'share', 'landing', 'promotion', 'vs'], item.platform),
        400, 'invalid platform param');
      assert(_.includes(['PC', 'android', 'iOS'], item.platform2), 400, 'invalid platform2 param');

      if (item.platform2 === 'PC') {
        item.deviceAttr = {
          os: ua.os,
          browser: ua.browser
        };
      }
      assert(item.userAttr, 400, 'invalid userAttr param');
      item.userAttr.ip = header.ip;

      assert(item.eventKey, 400, 'invalid eventKey param');
      assert(_.includes(['site', 'course', 'video', 'problem'], item.category), 400, 'invalid category param');
      assert(item.eventTime, 400, 'invalid eventTime param');
      assert(item.deviceAttr.os && item.deviceAttr.os.name, 400, 'invalid os.name param');
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
