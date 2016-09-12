"use strict";
var contentType = require('content-type')
var getRawBody = require('raw-body')
const rp = require('request-promise');
var request = require('request');

module.exports = function() {
  return function *reqproxy(next) {
    this.req.pipe(request('http://localhost:9999'+this.url))
    yield next;
  };
};
