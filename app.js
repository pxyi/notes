const Koa = require('koa');
const app = new Koa();

/* 记录URL以及页面执行时间 */
app.use(async (ctx, next) => {
    let start = new Date().getTime();
    await next();
    let execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', `${execTime}ms`);
});

/* 是否为开发环境 */
const isProduction = process.env.NODE_ENV === 'production';

/* 启用gzip压缩 */
var gzip = require('koa-gzip');
app.use(gzip());

/* 设置静态文件路径及缓存时间 */
var staticCache = require('koa-static-cache');
var maxAge = isProduction ? 24 * 60 * 60 * 30 : 0;
app.use(staticCache('./static', { maxAge: maxAge}));

/* 设置获取post请求参数中间件 */
const bodyparser = require('koa-bodyparser');
app.use(bodyparser());

// /* 获取文件 */
// const koaBody = require('koa-body');
// app.use(koaBody({ multipart: true }));

/* Nunjucks模板引擎, 根据环境控制是否缓存 */
let templating = require('./config/templating');
app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction
}));

/* 设置路由 */
const routes = require('./routes/routes');
app.use(routes());


/* 2800端口启动 */
let port = process.env.NODE_PORT || 2800;
let server = app.listen(port, 'localhost', () => {
	console.log(`Server at running http://localhost:${port}`)
});