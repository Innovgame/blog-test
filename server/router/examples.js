const Router = require('koa-router');
const ExampleController = require('../controllers/examples');

const router = new Router();

router.get('/', async (ctx) => {
  ctx.body = "examples router test";
});

router.post('/test', ExampleController.auth);
router.post('/login', ExampleController.login);
router.post('/register', ExampleController.register);

module.exports = router;
