"use strict";

const router = require('koa-router')();
const pixie = require('koa-pixie-proxy');
const Event = require('Event');
const Point = require('Point');
const Event35 = require('Event35');
const EventAuto = require('EventAuto');
const EventV4= require('EventV4');
const Log = require('Log');
const rp = require('request-promise');

router.all('/', function *() {
  this.body = 'hi diggzhang';
});

/**
 * 2.0~3.0时期的API
 */

router.use('/events', function *(next) {
  this.remoteIp  = (this.ip).split("f:")[1];
  yield next;
});

router.post('/events', function *() {
  yield Event.save(this.request.body, {ua: this.header['user-agent'], ip: this.remoteIp || this.ip});
  this.status = 204;
});

router.post('/point', function *() {
  yield Point.save(this.request.body.points);
  this.status = 204;
});

/**
 * 3.5时期API
 * onions v3.5 event API
 * POST http://track.yangcong345.com/api/v3_5/events
 */

router.use('/v3_5/events', function *(next) {
  this.remoteIp  = (this.ip).split("f:")[1];
  yield next;
});

router.post('/v3_5/events', function *() {
  yield Event35.save(this.request.body, {ua: this.header['user-agent'], ip: this.remoteIp || this.ip});
  this.status = 204;
});

/*
 * POST http://track.yangcong345.com/api/v3_6/autoevents
 */
router.post('/v3_6/autoevents', function *() {
  this.status = 204;
});

/**
 * 4.0时期API
 */
router.post('/v4/autoevents', function *() {
  yield EventAuto.save(this.request.body);
  this.status = 204;
});

router.use('/v4/events', function *(next) {
  this.remoteIp  = (this.ip).split("f:")[1];
  yield next;
});

router.post('/v4/events', function *() {
  yield EventV4.save(this.request.body, {ua: this.header['user-agent'], ip: this.remoteIp || this.ip});
  this.status = 204;
});

/**
 * API POST /api/log
 */
router.use('/log', function *(next) {
  this.remoteIp  = (this.ip).split("f:")[1];
  yield next;
});

router.post('/log', function *() {
  yield Log.save(this.request.body, {ua: this.header['user-agent'], ip: this.remoteIp || this.ip});
  this.status = 204;
});

module.exports = router;

/**
 this.header["accept"] = "*\/*";
 delete this.header["content-length"];
 this.header["content-type"] = "application/json";  //diggzhang: find this configure online
 delete this.header["content-encoding"];

 let options = {
    uri: "http://10.47.108.72:9999/api/v3_5/events",
    method: "POST",
    body: this.request.body,
    headers: this.header,
    json: true
  };

 rp(options)
 .then(function (parsedBody) {
    })
 .catch(function (err) {
      if (err) console.error(err);
    });
 **/
