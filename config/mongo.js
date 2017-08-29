const mongoose = require('mongoose');
var db = mongoose.createConnection('localhost', 'notes');
db.on('error', function (err) {
	console.log(err.toString());
});


/*
 *		------------------ 类别 ------------------
 *		name			 			名称   				String
 * 		desc			 			描述	 				String
 *		parent		 			父级Id 				ObjectId
 *		status					状态					Boolean
 *		createTime			创建时间 			 Date
 *		------------------------------------------
 */
let classSchema = mongoose.Schema({
	name: String,
	desc: String,
	parent: mongoose.Schema.Types.ObjectId,
	status: Boolean,
	createTime: { type: Date, default: Date.now() }
});

/*
 *		------------------ 文章 ------------------
 *		title			 			标题   				String
 * 		desc			 			描述	 				String
 * 		keyword					关键字				 Array
 *		readings  			浏览量				 Number
 *		share						分享数				 Number
 *		sort						排序					Number
 *    markdown        源码					String
 * 		content					内容					String
 *		parent		 			所属分类 			 ObjectId
 *		status					状态					Boolean
 *		createTime			创建时间 			 Date
 *		------------------------------------------
 */
let articleSchema = mongoose.Schema({
	title: String,
	desc: String,
	keyword: Array,
	readings: Number,
	share: Number,
	sort: Number,
	markdown: String,
	content: String,
	parent: mongoose.Schema.Types.ObjectId,
	status: Boolean,
	createTime: { type: Date, default: Date.now() }
});



module.exports = {
	classModel: db.model('class', classSchema),
	articleModel: db.model('article', articleSchema),
	ObjectId: mongoose.Schema.Types.ObjectId
}