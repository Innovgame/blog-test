const Router = require('koa-router');

const router = new Router();

router.get('/', async (ctx) => {
  ctx.body = "examples router test";
})

module.exports = router;
