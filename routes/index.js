const db = require('../config/mongo');


let index = async (ctx, next) => {
  // let clasItems = await db.classModel.find();
  ctx.render('index.html',{name: '首页', title: '标题'})
}


let article = async (ctx, next) => {
  console.log(ctx.params.id)
  let clasItems = await db.classModel.find();
  let article = await db.articleModel.findOne({'_id': ctx.params.id});
  ctx.render('index.html',{
    clasItems: clasItems,
    article: article
  })
}

module.exports = {
  'GET /': index,
  'GET /article/:id': article
}