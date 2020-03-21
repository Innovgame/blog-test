const Router = require('koa-router');

const router = new Router();

const examplesRouter = require('./examples');

router.use('/examples', examplesRouter.routes())
router.get('/', async (ctx) => {
  ctx.body = 'hello koa2';
})

module.exports = router;
