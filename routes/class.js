const db = require('../config/mongo');

let classList = async (ctx, next) => {
	let result = await db.classModel.find();
	ctx.body = {
		code: result ? 1000 : 1001,
		message: result ? '查询成功' : '查询失败',
		result: result
	}
}

let classDetails = async (ctx, next) => {
	let id = ctx.query.id;
	let result = await db.classModel.find({_id: id});
	ctx.body = {
		code: result ? 1000 : 1001,
		message: result ? '查询成功' : '查询失败',
		result: result
	}
}

let classFind = async (ctx, next) => {
	let id = ctx.params.id;
	let classItems = await db.classModel.find();
	let title = classItems.filter( (res) => res._id == id)[0].name
	let result = await db.articleModel.find({parent: id});
	ctx.render('index.html', {
		title: title,
    classItems: classItems,
    articleItems: result
  })
}


module.exports = {
	'GET /class/:id': classFind,
	'GET /notes/class/list': classList,
	'GET /notes/class/details': classDetails,
}