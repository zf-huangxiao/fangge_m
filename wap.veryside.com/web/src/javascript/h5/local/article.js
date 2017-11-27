//##include('../block/base.js');
//##include('../block/lazyload.js');
//##include('../block/doT.js');
//##include('../block/swiper.js');
//##include('../block/filter-dialog.js');
//##include('../block/banner.js');
//##include('../block/return-top.js');
//##include('../block/audio.js');
//##include('../block/ajaxloadmorecomments.js');
//##include('../block/updatewblogin.js');
//##include('../block/logout.js');


var $doc,
    $win,
    $contentList,
    $filterDialog,
    $loadMore,
    $banner,
    $weinxin_remind,
    $comments,
    $commentsList,
    $publishContent,
    $publishBtn,
    $actionBtn,
    $totalNum,
    $moreComments,
    $publishComm,
    $commArea,
    $cancelBtn,
    $penIcon,
    $filterBtn;

var _view = {
    init: function() {
        //this.topScrollBanner();
        _view.initSlideSwipe();
        //this.lazyimg();
        this.initCommentsLogin();
        this.initDelBtn();
    },


    topScrollBanner:function(){
        var topBannerSwiper = new Swiper('.swiper-top-banner',{
            pagination : '.top-banner-pagination',
            // paginationType : 'custom',
            // paginationCustomRender: function (swiper, current, total) {
            //     return current + ' of ' + total;
            // }
        })
    },

    initSlideSwipe : function(){
        var wiperAtlas = new Swiper('.article-wrapper .swiper-container',{
            pagination : 'null',
            // paginationType: 'fraction',
            onInit: function(swiper){
                swiper.lockSwipes();
                // if($('.swiper-container').find('.topPicNum').length==0){
                //     $('.swiper-container').append('<div class="topPicNum">'+swiper.slides.length+'<\div>');
                // }
                if($('.article-wrapper .swiper-container').find('.topPicNum').length==0){
                    $('.article-wrapper .swiper-container').append('<div class="topPicNum">'+swiper.slides.length+'<\div>');
                }
            }
        });
    },
    lazyimg:function(){
        $(".lazy").lazyload({
            effect : "fadeIn"
        });
    },
    isLogged:function () {
        var cookieArr = document.cookie.split(';');
        var uid,uToken;
        cookieArr.forEach(function (cur,index) {
            if(cur.indexOf('uid=') > -1){
                uid = cur.split('=')[1];
            }else if( cur.indexOf('token=') > -1){
                uToken = cur.split('=')[1];
            }
        });
        if(uid && uToken){//用户登录了
            return true;
        }else{//未登录
            return false;
        }
    },
    initCommentsLogin:function () {
        if(this.isLogged()){//已登录
            $commentsLogin.hide();
            $comments.find('.welcomeuser').show();
        }
    },
    initDelBtn:function () {
        var uid = base.cache.get_cookie('uid');
        $actionBtn.each(function (index,cur) {
            var speakerId = $(this).attr('uid');
            if(uid == speakerId && speakerId){
                $(this).find('.reply').hide();
                $(this).find('.del').show();
            }

        })


    }
};

var _event = {
    bind: function() {
        //$filterDialog.on('touchmove',this.stopFilterDialogDefaultEvent);
        $loadMore.on('click',this.loadIndexList);
        //$filterBtn.on('click',this.showFilterDialog);
        $banner.on('click',this.weixinremind);
        //$publishBtn.on('click',this.publishComment);
        $commentsList.on('click','span.del',this.deleteComment);
        $commentsList.on('click','span.reply',this.replySomeone);
        $moreComments.on('click',this.loadMoreComment);
        $publishComm.on('click',this.publishComment);
        $cancelBtn.on('click',this.closeOrCancelComm);
        $publishContent.on('focus',this.initArea);
        $publishContent.on('blur',this.restoreArea);
    },
    stopFilterDialogDefaultEvent:function(e){

        e.preventDefault && e.preventDefault();
        e.returnValue=false;
        e.stopPropagation && e.stopPropagation();
        return false;
    },

    showFilterDialog:function(){
        $filterDialog.show();
    },
    isWeiXin:function(){
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true;
        } else {
            return false;
        }
    },
    weixinremind:function () {
        if(_event.isWeiXin()){
            $doc.scrollTop(0);
            $weinxin_remind.show();
            $weinxin_remind.addClass('active');
            $weinxin_remind.click(function () {
                $(this).hide();
            })

        }

    },
    initArea:function(){
        if(_view.isLogged()) {
            $penIcon.hide();
            $publishContent.removeClass('pdl-56').addClass('no-pdl');
        }else{
            if(!base.tools.getQueryString('url')){
                //window.location.href = '/';
                window.location.href='/user?url=' + encodeURIComponent(window.location.href);
            }
        }
    },
    restoreArea:function(){
        $penIcon.show();
        $publishContent.addClass('pdl-56').removeClass('no-pdl');
    },

    sendCommOver:function(){
        $publishContent.attr('isReply',0);
        $publishContent.val('').blur();
        $penIcon.show();
        $publishContent.addClass('pdl-56').removeClass('no-pdl');
    },
    closeOrCancelComm:function(){
        $commArea.hide();
        $publishContent.val('').blur();
    },
    addCommentDom:function (data) {
        var avatarSrc = $('#comments-user-avatar').text(),
            nickName = $('#comments-user-nickname').text(),
            id = data.data.id,
            content = $publishContent.val().replace(/^回复[\s\S]+：/,"");
        var oCommentDiv = $('<div></div>'),
            oComment = $("<div class='reviewer noresponse'></div>").attr('comment_id',id);

        $('<img class="avatar">').attr('src',avatarSrc).appendTo(oCommentDiv);
        $('<div class="action-btn"><span class="del" style="display:block;">删除</span></div>').appendTo(oCommentDiv);
        $('<span class="name"></span>').text(nickName).appendTo(oComment);
        $('<span class="time">刚刚</span>').appendTo(oComment);
        $('<p class="reviewer-text"></p>').text(content).appendTo(oComment);
        oComment.appendTo(oCommentDiv);
        oCommentDiv.insertAfter($commentsList.children('h1'));
        oCommentDiv=null;
    },
    addReplyDom:function (data) {
        var avatarSrc = $('#comments-user-avatar').text(),
            nickName = $('#comments-user-nickname').text(),
            id = data.data.id,
            content = $publishContent.val().replace(/^回复[\s\S]+：/,""),
            replyWho,
            replyWhat;
        var oCommentDiv = $('<div></div>'),
            oReply = $('<div class="responder"></div>').attr('comment_id',id),
            oComment = $("<div class='reviewer'></div>");
        replyWho = $commentsList.find('div>div[comment_id='+$publishComm.attr('replyid')+']').find('.name').text()||"";
        replyWhat = $commentsList.find('div>div[comment_id='+$publishComm.attr('replyid')+']').find('p').text()||"";

        $('<img class="avatar">').attr('src',avatarSrc).appendTo(oCommentDiv);
        $('<div class="action-btn"><span class="del" style="display:block;">删除</span></div>').appendTo(oCommentDiv);
        $('<span class="name"></span>').text(nickName).appendTo(oReply);
        $('<span class="time">刚刚</span>').appendTo(oReply);
        $('<p class="reviewer-text"></p>').text(content).appendTo(oReply);
        $('<span class="name"></span>').text(replyWho).appendTo(oComment);
        $('<p class="reviewer-text"></p>').text(replyWhat).appendTo(oComment);
        oReply.appendTo(oCommentDiv);
        oComment.appendTo(oCommentDiv);
        oCommentDiv.insertAfter($commentsList.children('h1'));
        oCommentDiv=null;
    },
    ajaxComment:function (opts) {
        $.ajax({
            type:opts.type||'GET',
            url:opts.url,
            data:opts.data,
            dataType:'json',
            success:opts.success
        })

    },
    publishComment:function () {
        if(_view.isLogged()){
            if($publishContent.val() && !/^ +$/.test($publishContent.val())){
                var dataId =/\/(\d+).html/.exec(window.location.pathname)[1];
                var replyId = 0;
                var content = $publishContent.val();
                var type = 10;
                //测试阶段拼接这三个参数;
                var uid = base.cache.get_cookie('uid');
                var token = base.cache.get_cookie('token');
                var sessionid = base.cache.get_cookie('nsessid');
                var totalNum = parseInt($totalNum.text());
                if(/^回复[\s\S]+：/.test(content)){//回复某人的
                    content = content.replace(/^回复[\s\S]+：/,"");
                    if((/^ +$/.test(content)||!content) && !$publishContent.attr('isReply')){
                        alert('输入点内容再提交吧~')
                    }else{
                        //replyId = $(this).attr('replyId');
                        replyId = $publishComm.attr('replyId');
                        _event.ajaxComment({
                            type:'POST',
                            url:'/article/index_apis/comment'+'?uid='+uid+'&token='+token+'&sessionid='+sessionid,
                            data:{
                                data_id:dataId,
                                reply_id:replyId,
                                content:content,
                                type:type,
                            },
                            success:function (data) {
                                if(data.code == '200'){
                                    _event.addReplyDom(data);
                                    $totalNum.text(totalNum+1);
                                    //$publishContent.val('');
                                    _event.sendCommOver();
                                }else{
                                    alert(data.msg);
                                }
                            }
                        })

                    }

                }else{//只是评论
                    _event.ajaxComment({
                        type:'POST',
                        url:'/article/index_apis/comment'+'?uid='+uid+'&token='+token+'&sessionid='+sessionid,
                        data:{
                            data_id:dataId,
                            reply_id:replyId,
                            content:content,
                            type:type,
                        },
                        success:function (data) {
                            if(data.code == '200'){
                                _event.addCommentDom(data);
                                $totalNum.text(totalNum+1);
                                //$publishContent.val('');
                                _event.sendCommOver();
                                $('.nocomment').length>0?$('.nocomment').hide():"";
                            }else{
                                alert(data.msg);
                            }

                        }
                    })
                }

            }else{
                alert('请填写评论内容~');
                $publishContent.focus();
            }
        }else{
            //$login_pop_layer.fadeIn();
            if(!base.tools.getQueryString('url')){
                //window.location.href = '/';
                window.location.href='/user?url=' + encodeURIComponent(window.location.href);
            }
        }

    },
    deleteComment:function () {
        var r = confirm('确认删除此次评论吗?');
        if(!r) return;
        var uid = base.cache.get_cookie('uid');
        var token = base.cache.get_cookie('token');
        var sessionid = base.cache.get_cookie('nsessid');
        var respond = $(this).parent().siblings('.responder');
        var reviewer = $(this).parent().siblings('.reviewer');
        var dataId,type;
        var totalNum =  parseInt($totalNum.text());

        if(respond.length > 0){//删除自己的回复
            dataId  = respond.attr('comment_id'),
                type = 10;
            _event.ajaxComment({
                type:'GET',
                url:'/article/index_apis/deletecomment'+'?uid='+uid+'&token='+token+'&sessionid='+sessionid,
                data:{
                    id:dataId,
                    type:type,
                },
                success:function (data) {
                    if(data.code == '200'){
                        respond.parent().remove();
                        $totalNum.text(totalNum-1);
                    }else{
                        alert(data.msg);
                    }
                }
            })
        }else{//删除自己的文章评论
            dataId  =reviewer.attr('comment_id'),
                type = 10;
            _event.ajaxComment({
                type:'GET',
                url:'/article/index_apis/deletecomment'+'?uid='+uid+'&token='+token+'&sessionid='+sessionid,
                data:{
                    id:dataId,
                    type:type,
                },
                success:function (data) {
                    if(data.code == '200'){
                        reviewer.parent().remove();
                        $totalNum.text(totalNum-1);
                        var $noConment = $('.nocomment'),
                            totalNow = $totalNum.text();
                        if($noConment.length > 0 && totalNow == 0){
                            $noConment.show();
                        }else if($noConment.length == 0 && totalNow == 0){
                            $comments.append('<div class="nocomment">暂无，来分享看法吧!</div>');
                        }
                    }else{
                        alert(data.msg);
                    }
                }
            })

        }
    },
    replySomeone:function () {
        var needScrollTo = $comments.offset().top-80;
        $win.scrollTop(needScrollTo);
        if(_view.isLogged()){//已登录
            var retBackName,contentId;

            if($(this).parent().siblings('.responder').length>0){//B回复了A，此次是某人回复B
                retBackName = $(this).parent().siblings('.responder').find('.name').text(),
                    contentId = $(this).parent().siblings('.responder').attr('comment_id');
            }else{
                retBackName = $(this).parent().siblings('.reviewer').find('.name').text(),
                    contentId = $(this).parent().siblings('.reviewer').attr('comment_id');
            }
            $publishContent.attr('isReply',1);
            //_event.sendComm();

            $publishContent.val('回复'+retBackName+'：').focus();
            //$publishContent.val('回复'+retBackName+'：');
            $publishComm.attr('replyId',contentId);

        }else{
            //$login_pop_layer.fadeIn();
            //window.location.href='/user'
            if(!base.tools.getQueryString('url')){
                //window.location.href = '/';
                window.location.href='/user?url=' + encodeURIComponent(window.location.href);
            }
        }

    },
    loadMoreComment:function(){
        var id = window.location.pathname.match(/\/(\d+).html/)[1];
        loadMoreComments.init({
            el: $commentsList,
            async: false,
            url: '/article/index_apis/loadmorecomment?id=' + id + '&type=10&p=' + commentsPage,
            yCallback: function () {
                var uid = base.cache.get_cookie('uid');
                $('.action-btn').each(function (index,cur) {
                    var speakerId = $(this).attr('uid');
                    if(uid == speakerId && speakerId){
                        $(this).find('.reply').hide();
                        $(this).find('.del').show();
                    }

                });
            }
        });
    },

};

var _data = {};

function init() {
    _view.init();
    _event.bind();
}

$(document).ready(function(){
    $doc = $(document);
    $win = $(window);
    $filterDialog = $('#filter-dialog');
    $filterBtn = $('#filter-btn');
    $loadMore = $('#load-more-btn');
    $contentList = $('#content-list');

    $pswpCloseBtn = $('.pswp__button--close');
    $pswpCaption = $('.pswp__caption');
    $pswpCaptionCenter = $('.pswp__caption__center');
    $banner=$('.banner');
    $weinxin_remind=$('.weixin-remind');
    $comments            = $('#comments');
    $commentsList        = $comments.find('.comments-lists');
    $commentsLogin       = $('.comments-login');
    $publishContent      = $('#comments_area');
    $publishBtn          = $('#publish_comm');
    $cancelBtn           = $('#cancel_comm');
    $actionBtn           = $('.action-btn');
    $totalNum            = $commentsList.find('h1>span');
    $moreComments        = $('#comments-checkMore-btn');
    $comments_login_btn  = $commentsLogin.find('.comment-login-btn');
    $publishComm = $('#publish_comm');
    $commArea = $('.comm-area');
    $penIcon = $('#pen_icon');


    init();
    updatewblogin.init();
    logout.init($('#logout'))
});
