const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const session = require('koa-generic-session');
const MongoStore = require('koa-generic-session-mongo');
const flash = require('koa-flash');
const gzip = require('koa-gzip');
const scheme = require('koa-scheme');
const views = require('koa-views');
const config = require('config-lite');
const path = require('path');
const logger = require('koa-logger');
const statics = require('koa-static');
const moment = require('moment');
const gravatar = require('gravatar');
const router = require('./routes');
const app = new Koa();

app.keys = config.keys;

app.use(logger());
app.use(bodyparser());

app.use(statics(__dirname + '/public'));

app.use(session({
    store: new MongoStore(config.mongodb)
}));
app.use(flash({}));

app.use(scheme(config.schemeConf));

app.use(gzip());


app.use(async(ctx, next) => {
    ctx.state.session = ctx.session;
    ctx.state.now = new Date();
    ctx.state.flash = ctx.flash;
    ctx.state.app = ctx.app;
    ctx.state.tabs = config.tabs;
    ctx.state.query = ctx.query;
    ctx.state.moment = moment;
    ctx.state.gravatar = gravatar;

    await next();
});

app.use(views(path.join(__dirname, "views"), {
    extension: 'ejs'
}));

app.use(router.routes());

app.on('error', (err, ctx) =>
    console.log('server error', err, ctx)
);

if (module.parent) {
    module.exports = app.callback();
} else {
    app.listen(config.port, function () {
        console.log('Server listening on: ', config.port);
    });
}
