const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const cors = require("koa2-cors");
const logger = require("koa-logger");
const Router = require("koa-router");

const app = new Koa();

const router = new Router();

router.get('/', async ctx => {
  ctx.body = {
    text: 'Hello koa2'
  }
});

app
  .use(cors())
  .use(logger())
  .use(bodyParser());

app.use(router.routes(), router.allowedMethods());
app.listen(5000, () => {
  console.info('sever listen on http://127.0.0.1:5000');
});
