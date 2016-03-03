"use strict";

import mongoose from 'mongoose';
const Point = mongoose.model('Point');

class PointController {
  constructor(attributes) {
    // this.attributes = clone(attributes || {})
  };

  static *save(points) {
    yield Point.create(points);
  };
}

module.exports = PointController;
