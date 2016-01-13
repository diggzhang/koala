import koa from 'koa';
import router from 'koa-router';
import logger from 'koa-logger';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';
import { server } from './config';

const app = koa();
const port = server.port;
const koaRouter  = router();

koaRouter
  .get('/', function *(next) {
    this.body = "hello world";
  });

app.use(logger())
  .use(bodyParser())
  .use(json())
  .use(koaRouter.routes());

app.listen(port);

console.log(`listening on port: ${port}`);
