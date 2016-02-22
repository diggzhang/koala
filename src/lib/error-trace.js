"use strict";

module.exports = function errorTrace() {
  return function *(next) {
    try {
      yield next;
    }
    catch (err) {
      // mongoose error
      if (err.name == 'ValidationError') {
        err.status = 400;
        console.error(err);
      }

      this.body = {msg: err.message};
      this.status = err.status || 500;
      this.app.emit('error', err, this);
    };
  };
};
