const Router = require('koa-router');

const router = new Router();

const topics = require('./topics');
const users = require('./users');

router.get('/', async(ctx)=>{
    await ctx.redirect('/topics');
});
router.use('/users', users.routes(), users.allowedMethods());
router.use('/topics', topics.routes(), topics.allowedMethods());

module.exports = router;

