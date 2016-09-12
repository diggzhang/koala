"use strict";

import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import cors from 'kcors';
import Router from 'koa-router';
const errorTrace = require('../lib/error-trace');
const proxy = require('../lib/HttpProxy');
const decompres = require('../lib/HttpDecompress');
const router = new Router({prefix: '/api'});

router.use(
  require('../routes/main').routes()
);

module.exports = function (app) {
  app
    .use(cors({
      "exposeHeaders": ["Accept-Ranges", "Content-Encoding", "Content-Length", "Content-Range", "Authorization"],
      "maxAge": "3600"
    }))
    .use(logger())
    .use(errorTrace())
    .use(proxy())
    .use(decompres())
    .use(bodyParser({"jsonLimit":"16mb"}))
    .use(router.routes())
};
