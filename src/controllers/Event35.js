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
    if (_.isArray(events) == false) {
      events = _.concat(events,[]);
    }
    events.map(item => {
      //assert(item.eventKey, 400, 'invalid eventKey param');
      //assert(item.eventTime, 400, 'invalid eventTime param');
      if (item.user == "") {
        delete item.user;
      }
      item.ua = header.ua;
      item.ip = header.ip;
      try {
        item.location = qqwry.searchIP(header.ip).Country
      }
      catch(e) {
        console.error(`invalid ip address ${header.ip}`)
      }
    });

    try {
      yield Event35.create(events);
    } catch (e) {
      console.error(e);
      console.error(events);
    }
  };
}

module.exports = Event35Controller;
