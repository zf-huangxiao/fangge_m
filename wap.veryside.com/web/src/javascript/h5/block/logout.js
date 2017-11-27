var logout={
    init:function ($ele) {
        $ele.on('click',this.logout);
    },


    //退出
    logout:function(){
        base.cache.clear_cookie('token');
        base.cache.clear_cookie('uid');
        base.cache.clear_cookie('nsessid');
        base.cache.clear_cookie('lgtype');

        if(!base.tools.getQueryString('url') || base.tools.getQueryString('url') == null){
            window.location.reload();
        }else{
            window.location.href = base.tools.getQueryString('url');
        }
    }
};
