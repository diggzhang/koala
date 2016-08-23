"use strict";

import mongoose from 'mongoose';
import _ from 'lodash';
const libqqwry = require('lib-qqwry');
const qqwry = libqqwry.init();
qqwry.speed();
const EventV4 = mongoose.model('EventV4');

class EventV4Controller {
  constructor(attributes) {
    // this.attributes = clone(attributes || {})
  };

  static *save(events, header) {
    if (_.isArray(events) == false) {
      events = _.concat(events,[]);
    }
    events.map(item => {
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
      yield EventV4.create(events);
    } catch (e) {
      console.error(e);
      console.error(events);
    }
  };
}

module.exports = EventV4Controller;
