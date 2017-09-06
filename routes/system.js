let index = async (ctx, next) => {
  ctx.render('dist/index.html', {})
}


module.exports = {
  'GET /system/': index
}