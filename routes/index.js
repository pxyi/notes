const db = require('../config/mongo');


let index = async (ctx, next) => {
  let classItems = await db.classModel.find();
  ctx.render('index.html',{title: '首页', classItems: classItems})
}



module.exports = {
  'GET /': index,
}