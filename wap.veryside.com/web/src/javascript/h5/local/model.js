//##include('../block/base.js');
//##include('../block/lazyload.js');
//##include('../block/doT.js');
//##include('../block/swiper.js');
//##include('../block/filter-dialog.js');
//##include('../block/banner.js');
//##include('../block/return-top.js');
//##include('../block/updatewblogin.js');
//##include('../block/logout.js');


var $doc,
    $win,
    $contentList,
    $filterDialog,
    $loadMore,
    $banner,
    $weinxin_remind,
    $filterBtn,
    $hided;

var _view = {
    init: function() {
      this.initScroll();
    },
    initScroll:function () {
        $('html body').scrollTop($('.top-bar').height());
    },

};

var _event = {
    bind: function() {
        //$filterDialog.on('touchmove',this.stopFilterDialogDefaultEvent);
        // $loadMore.on('click',this.loadIndexList);
        //$filterBtn.on('click',this.showFilterDialog);
        $banner.on('click',this.weixinremind) ;
        $hided.on('click',this.scrollWin);
        $win.on('scroll',this.onScroll);
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

    } ,
    scrollWin:function () {
         $('.tishi').css('visibility','hidden');
        var offsetT=$('.top-pic>.desc').offset().top,scrollT= $('html body').scrollTop();
        var time=(offsetT- scrollT)/offsetT*300;
        $('html body').animate({scrollTop:offsetT},time);
    },
    onScroll:function () {
       $win.scrollTop()>100?$('.tishi').css('visibility','hidden'):'';
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
    $hided=$('.top-pic').find('.hided');


    init();
    updatewblogin.init();
    logout.init($('#logout'))
});
