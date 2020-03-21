const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const cors = require("koa2-cors");
const logger = require("koa-logger");

const router = require('./router');
const db = require('./models');

const app = new Koa();

app
  .use(cors())
  .use(logger())
  .use(bodyParser());

app.use(router.routes(), router.allowedMethods());
app.listen(5000, () => {
  db.sequelize
    .sync({
      force: false
    })
    .then(() => {
      console.log('sequelize connect success')
      console.log('sever listen on http://127.0.0.1:5000')
    })
    .catch(err => {
      console.error(err)
    })
  console.info('sever listen on http://127.0.0.1:5000');
});
