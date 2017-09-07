let upfile = async (ctx, next) => {
  console.log(ctx.req.file)
  ctx.body = {
    success: 1,
    url: 'upfile/' + ctx.req.file.filename
  }
}

module.exports = {
  'FILE /notes/upfile': upfile                 // 上传图片
}