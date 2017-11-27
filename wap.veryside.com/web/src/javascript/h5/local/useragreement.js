//##include('../block/base.js');
//##include('../block/swiper.js');
//##include('../block/filter-dialog.js');
//##include('../block/updatewblogin.js');
//##include('../block/logout.js');
var $doc,
    $win,
    $tips,
    $contents,
    $filterDialog,
    $filterBtn,
    $button;

var _view = {
    init: function() {
        this.topScrollBanner();
    },


    topScrollBanner:function(){
        var topBannerSwiper = new Swiper('.swiper-top-banner',{
            pagination : '.top-banner-pagination',
            // paginationType : 'custom',
            // paginationCustomRender: function (swiper, current, total) {
            //     return current + ' of ' + total;
            // }
            onInit: function(swiper){
                if(swiper.isBeginning && swiper.isEnd){
                    swiper.lockSwipes();
                    $('.top-banner-pagination').hide();
                }
            }
        })
    }

};

var _event = {
    bind: function() {

        $('.close').on('click',function(){
            window.opener=null;
            window.open('','_self');
            window.close();})
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
    $tips=$('.title').find('li');
    $contents=$('.content').find('li');
    $button=$('button');
    $filterDialog = $('#filter-dialog');
    $filterBtn = $('#filter-btn');
    init();
    updatewblogin.init();
    logout.init($('#logout'))

});
