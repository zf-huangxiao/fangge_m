//##include('../block/base.js');
//##include('../block/doT.js');
//##include('../block/swiper.js');
//##include('../block/filter-dialog.js');
//##include('../block/qqlogin.js');
//##include('../block/wblogin.js');
//##include('../block/phonelogin.js');


$(document).ready(function(){
    $('#close_login').on('click',function(){
        var urlStr = window.location.href;
        if(/user\/?$/.test(urlStr)){
            window.location.href = '/';
        }else if(base.tools.getQueryString('url')){
            window.location.href = base.tools.getQueryString('url');
        }
    })
})