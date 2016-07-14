"use strict";

const router = require('koa-router')();
const pixie = require('koa-pixie-proxy');
const Event = require('Event');
const Point = require('Point');
const Event35 = require('Event35');
const EventAuto = require('EventAuto');
const proxy = pixie({host: 'http://localhost:4500'});
var rp = require('request-promise');

router.use('/events', function *(next) {
  let ipAddress;
  let forwardedIpsStr = this.get('X-Forwarded-For');
  let clientIp = this.header['remoteip'];
  if (clientIp) {
    this.remoteIp = clientIp
  } else if (forwardedIpsStr) {
    /**
    * 'x-forwarded-for' header may return multiple IP addresses in
    * the format: "client IP, proxy 1 IP, proxy 2 IP" so take the
    * the first one
    **/
    this.remoteIp = forwardedIpsStr.split(',')[0];
  }
  yield next;
});

router.all('/', function *() {
  this.body = 'hi diggzhang';
});

router.post('/oldevents', proxy('/api/events'));

router.post('/events', function *() {
  yield Event.save(this.request.body, {ua: this.header['user-agent'], ip: this.remoteIp || this.ip});
  this.status = 204;
});

router.post('/point', function *() {
  yield Point.save(this.request.body.points);
  this.status = 204;
});

/*
 * onions v3.5 event API
 * POST http://track.yangcong345.com/api/v3_5/events
 */

router.use('/v3_5/events', function *(next) {
  let forwardedIpsStr = this.get('X-Forwarded-For');
  let clientIp = this.header['remoteip'];
  if (clientIp) {
    this.remoteIp = clientIp;
  } else if (forwardedIpsStr) {
    this.remoteIp = forwardedIpsStr.split(',')[0];
  }

  yield next;
});

router.post('/v3_5/events', function *() {
  yield Event35.save(this.request.body, {ua: this.header['user-agent'], ip: this.remoteIp || this.ip});
  this.status = 204;
});

/*
 * onions v3.6 auto send events API
 * POST http://track.yangcong345.com/api/v3_6/autoevents
 */

router.post('/v3_6/autoevents', function *() {
  yield EventAuto.save(this.request.body);
  this.header["accept"] = "*/*";
  delete this.header["content-length"];
  //this.header["content-type"] = "application/json";  //diggzhang: find this configure online

  let options = {
    uri: "http://10.47.108.72:8080/api/v3_6/autoevents",
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

  this.status = 204;
});

module.exports = router;
