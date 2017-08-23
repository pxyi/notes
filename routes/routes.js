const fs = require('fs');


let addControllers = (router) => {
  let files = fs.readdirSync(__dirname);
  let fileJS = files.filter( (res) => {
    return !res.startsWith('routes') && res.endsWith('.js')
  });
  for(let res of fileJS){
    let mapping = require(`${__dirname}/${res}`);
    addMapping(router, mapping);
  }
}


/* 获取文件 */
const koaBody = require('koa-body');

let addMapping = (router, mapping) => {
  for(let url in mapping) {
    if(url.startsWith('GET ')){
      let path = url.substring(4);
      router.get(path, mapping[url])
    }else if(url.startsWith('POST ')){
      let path = url.substring(5);
      router.post(path, mapping[url])
    }else if(url.startsWith('FILE ')){
      let path = url.substring(5);
      router.post(path, koaBody({ multipart: true }), mapping[url])
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