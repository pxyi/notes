const Koa = require('koa');
const app = new Koa();

/* Nunjucks模板引擎, 根据环境控制是否缓存 */
let templating = require('./templating');
const isProduction = process.env.NODE_ENV === 'production';
app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction
}));

/* 设置静态文件路径 */
let staticFiles = require('./static-files');
app.use(staticFiles('/static/', __dirname + '/static'));

/* 设置获取post请求参数中间件 */
const bodyparser = require('koa-bodyparser');
app.use(bodyparser());

/* 设置路由 */
const routes = require('./routes/routes');
app.use(routes());


/* 3001端口启动 */
let port = process.env.NODE_PORT || 3001;
let server = app.listen(port, 'localhost', () => {
	console.log(`Server at running localhost:${port}`)
});