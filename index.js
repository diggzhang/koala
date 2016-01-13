var koa = require('koa');
var app = koa();
var port = process.argv[2];

app.listen(port);

app.use(function *() {
    this.body = 'hello'
});
