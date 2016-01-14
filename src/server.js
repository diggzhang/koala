import fs from 'fs';
import koa from 'koa';
import router from 'koa-router';
import logger from 'koa-logger';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import { server } from './config';

/**
 * server
 */

const port = server.port;
const app = koa();
const koaRouter  = router();

/**
 *Connect to database
 */

mongoose.connect(server.mongo.url);
mongoose.connection.on("error", function (err) {
  console.log(err);
});

/**
 * Load the models
 */

const modelsPath = "./models";
fs.readdirSync(modelsPath).forEach(function (file) {
  if(~file.indexOf("js")) {
    require(modelsPath + "/" + file);
  }
});

/**
 * routes
 */

koaRouter
  .get('/', function *(next) {
    this.body = "hello world";
  })
  .get('/404', function *(next) {
    this.body = "page not found"
  })
  .get('/500', function *(next) {
    this.body = "internal server error"
  });

app.use(logger())
  .use(bodyParser())
  .use(json())
  .use(koaRouter.routes());

app.listen(port);

console.log(`Listening on port: ${port}`);
