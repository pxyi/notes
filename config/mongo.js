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
 *		create_time			创建时间 			 Date
 *		update_time			修改时间       Date
 *		------------------------------------------
 */
let classSchema = mongoose.Schema({
	name: String,
	desc: String,
	parent: ObjectId,
	create_time: { type: Date, default: Date.now }
});

/*
 *		------------------ 文章 ------------------
 *		title			 			标题   				String
 * 		desc			 			描述	 				String
 * 		keyword					关键字				 Array
 *		readings  			浏览量				 Number
 *		share						分享数				 Number
 * 		content					内容					String
 *		parent		 			所属分类 			 ObjectId
 *		create_time			创建时间 			 Date
 *		update_time			修改时间       Date
 *		------------------------------------------
 */
let articleSchema = mongoose.Schema({
	title: String,
	desc: String,
	keyword: Array,
	readings: Number,
	share: Number,
	content: String,
	parent: ObjectId,
	create_time: { type: Date, default: Date.now },
	uptade_time: Date
});



module.exports = {
	classModel: db.model('class', classSchema),
	articleModel: db.model('article', articleSchema)
}