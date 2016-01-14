import koa from 'koa';
import router from 'koa-router';
import logger from 'koa-logger';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';
import { server } from './config';
import model from './models/user';
import mongoose from 'koa-mongoose';
import mongooseq from 'mongoose-q';

const app = koa();
const port = server.port;
const koaRouter  = router();
const dbConfig = {
  mongoose: require('mongoose-q')(),
  user: '',
  pass: '',
  host: '10.8.8.111',
  port: 27017,
  database: 'test',
  db: {
    native_parser: true
  },
  server: {
    poolSize: 5
  }
};


koaRouter
  .get('/', function *(next) {
    this.body = "hello world";
  })
  .post('/user', function *(next) {
    let user = new User({
      user: "hello",
      password: "wowwow"
    });
    yield user.saveQ();
    this.body = 'OK';
  });

app.use(logger())
  .use(bodyParser())
  .use(json())
  .use(mongoose(dbConfig))
  .use(koaRouter.routes());

app.listen(port);

console.log(`listening on port: ${port}`);
