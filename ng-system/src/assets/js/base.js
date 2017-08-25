(function () {
  /* 是否全屏 */
  var fullScreenBool = true;
  var docElm = document.documentElement;
  $('body').on('click', '#fullScreen', function () {
    if(fullScreenBool){
      //W3C  
      if (docElm.requestFullscreen) {  
          docElm.requestFullscreen();  
      }
      //FireFox  
      else if (docElm.mozRequestFullScreen) {  
          docElm.mozRequestFullScreen();  
      }
      //Chrome等  
      else if (docElm.webkitRequestFullScreen) {  
          docElm.webkitRequestFullScreen();  
      }
      //IE11
      else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
      }
      fullScreenBool = false;
    }else{
      if (document.exitFullscreen) {  
          document.exitFullscreen();  
      }  
      else if (document.mozCancelFullScreen) {  
          document.mozCancelFullScreen();  
      }  
      else if (document.webkitCancelFullScreen) {  
          document.webkitCancelFullScreen();  
      }
      else if (document.msExitFullscreen) {
            document.msExitFullscreen();
      }
      fullScreenBool = true;
    }
  });

  /* 导航切换 */
  $('body').on('click', '#navbar', function () {
      if($('.ui-nav').hasClass('active')){
        $('.ui-nav, .ui-header, .ui-container').removeClass('active');
      }else{
        $('.ui-nav, .ui-header, .ui-container').addClass('active');
      }
  });
  
  /* 显示所选文件名称 */
  $('body').on('change', '.ui-file-input', function () {
    var _this = $(this);
    var filesName = [];
    console.log(_this[0].files)
    for(var i = 0; i < _this[0].files.length; i++){
      filesName.push(_this[0].files[i].name);
    }
    var text = '共' + filesName.length + '个文件：' + filesName.join('／');
    if(!filesName.length){
      text = '请选择文件';
    }
    _this.siblings('span').text(text).attr('title', text);
  });

  /* 图片点击查看大图 */
  $('body').on('click', '.ui-image-enlarge', function () {
    window.open($(this).attr('src'));
  });


})()