"use strict";

import zlib from 'zlib';
import getRawBody from 'raw-body';

module.exports = function() {
  return function *decompress(next) {
    if (this.header['content-encoding'] !== 'gzip') return yield next;
    let gunzip =  zlib.createGunzip();
    this.req.pipe(gunzip);

    let string = yield getRawBody(gunzip, {
      length: this.length,
      limit: '16mb',
      encoding: this.charset
    });
    this.request.body = JSON.parse(string.toString());
    yield next;
  };
};
