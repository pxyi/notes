const db = require('../config/mongo');

let systemList = async (ctx, next) => {
  ctx.render('system/list.html')
}

let systemDetails = async (ctx, next) => {
  let data = await db.classModel.find();
  ctx.render('system/details.html', {
    classItems: data
  })
}

let updateNotes = async (ctx, next) => {
  let params = ctx.request.body || {};
  let entity = new db.articleModel(params);
  let result = await entity.save()
  ctx.body = {
    code: result ? 1000 : 1001,
    message: result ? '存储成功' : '存储失败'
  }
}

let upfile = async (ctx, next) => {
  console.log(ctx.request.body.files);
  ctx.body = {
    success: 1,
    url: 'https://pandao.github.io/editor.md/images/logos/editormd-logo-180x180.png'
  }
}

module.exports = {
  'GET /system': systemList,             // 文章列表页
  'GET /system/:id': systemDetails,      // 打开发布/修改文章页
  'POST /updateNotes': updateNotes,      // 发布/修改文章
  'FILE /upfile': upfile                 // 上传图片
}