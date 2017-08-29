const db = require('../config/mongo');

let articleList = async (ctx, next) => {
  let params = ctx.query.page ? ctx.query : {page: 1,count: 10};
  let query = {};
  for(let q in params){
    if(q != 'page' && q != 'count' && params[q].length){query[q] = params[q]}
  }
  if(query.title){
    query.title = new RegExp(query.title);
  }
  let articleList = await db.articleModel.find(query).skip((Number(params.page) - 1) * params.count).limit(Number(params.count));
  let articleCount = await db.articleModel.count();

  ctx.body = {
    code: 1000,
    message: '请求成功',
    result: {
      page: Number(params.page),
      count: Number(params.count),
      total: articleCount,
      list: articleList
    }
  }
}

let articleUpdate = async (ctx, next) => {
  let params = ctx.request.body || {};
  params.keyword = params.keyword.split('|');
  if(params.id == 'new'){
    delete params.id;
    let entity = new db.articleModel(params);
    var result = await entity.save();
  }else{
    let id = params.id;
    delete params.id;
    var result = await db.articleModel.update({_id: id}, params, {upsert : true});
  }

  ctx.body = {
    code: result ? 1000 : 1001,
    message: result ? '存储成功' : '存储失败'
  }
}

let articleDetails = async (ctx, next) => {
  let id = ctx.query.id;
  let result = await db.articleModel.findById(id);
  result.keyword = result.keyword.join('|');
  ctx.body = {
    code: result ? 1000 : 1001,
    message: result ? '查询成功' : '查询失败',
    result: result
  }
}

let articleDelete = async (ctx, next) => {
  let id = ctx.query.id;
  let result = await db.articleModel.remove({_id: id});
  ctx.body = {
    code: result ? 1000 : 1001,
    message: result ? '删除成功' : '删除失败',
  }
}

let articleDetailsHTML = async (ctx, next) => {
  let classItems = await db.classModel.find();
  let article = await db.articleModel.findOne({'_id': ctx.params.id});
  ctx.render('details.html',{
    title: article.title,
    classItems: classItems,
    article: article
  });
}


let upfile = async (ctx, next) => {
  console.log(ctx.request.body.files);
  ctx.body = {
    success: 1,
    url: 'https://pandao.github.io/editor.md/images/logos/editormd-logo-180x180.png'
  }
}

module.exports = {
  'GET /article/:id': articleDetailsHTML,

  'GET /notes/article/list': articleList,             // 文章列表
  'GET /notes/article/details': articleDetails,       // 文章详情
  'POST /notes/article/update': articleUpdate,        // 发布/修改文章
  'GET /notes/article/delete': articleDelete,         // 删除文章

  'FILE /notes/upfile': upfile                 // 上传图片
}