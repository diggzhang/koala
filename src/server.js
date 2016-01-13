import koa from 'koa';
import logger from 'koa-logger';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';
import { server } from './config';

const app = koa();
const port = server.port;

app.use(logger())
  .use(bodyParser())
  .use(json());

app.listen(port);
