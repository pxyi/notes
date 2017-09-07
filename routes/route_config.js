const fs = require('fs');


let addControllers = (router) => {
  let files = fs.readdirSync(__dirname);
  let fileJS = files.filter( (res) => {
    return !res.startsWith('route_config') && res.endsWith('.js')
  });
  for(let res of fileJS){
    let mapping = require(`${__dirname}/${res}`);
    addMapping(router, mapping);
  }
  /* 定义 404页面 */
  router.get('*', async (ctx, next) => {
    ctx.render('404.html');
  });
}

//加载koa-multer模块 
const multer = require('koa-multer');
var storage = multer.diskStorage({  
  //文件保存路径  
  destination: function (req, file, cb) {  
    cb(null, 'static/upfile/')  
  },  
  //修改文件名称  
  filename: function (req, file, cb) {  
    var fileFormat = (file.originalname).split(".");  
    cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);  
  }  
})  
//加载配置  
var upload = multer({ storage: storage });

let addMapping = (router, mapping) => {
  for(let url in mapping) {
    if(url.startsWith('GET ')){
      let path = url.substring(4);
      router.get(path, mapping[url]);
    }else if(url.startsWith('POST ')){
      let path = url.substring(5);
      router.post(path, mapping[url])
    }else if(url.startsWith('FILE ')){
      let path = url.substring(5);
      router.post(path, upload.single('file'), mapping[url])
    }else if(url.startsWith('ALL ')){
      let path = url.substring(4);
      router.use(path, mapping[url]);
    }else{
      console.log(`invalid URL: ${url}`);
    }
  }
}


module.exports = () => {
  let router = require('koa-router')();
  addControllers(router);
  return router.routes();
}