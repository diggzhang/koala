"use strict";

import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import cors from 'koa-cors';
import Router from 'koa-router';
const errorTrace = require('../lib/error-trace');
const decompress = require('../lib/HttpDecompress');
const router = new Router({prefix: '/api'});

router.use(
  require('../routes/main').routes()
);

module.exports = function (app) {
  app
    .use(cors({expose: ['Authorization']}))
    .use(logger())
    .use(errorTrace())
    .use(decompress())
    .use(bodyParser())
    .use(router.routes())
};
