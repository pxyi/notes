let index = async (ctx, next) => {
  ctx.render('index.html',{name: '首页', title: '标题'})
}


module.exports = {
  'GET /': index
}