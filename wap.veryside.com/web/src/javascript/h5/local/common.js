//##include('../block/base.js');
//##include('../block/lazyload.js');
//##include('../block/doT.js');
//##include('../block/ajaxloadmore.js');
//##include('../block/swiper.js');
//##include('../block/filter-dialog.js');
//##include('../block/return-top.js');
//##include('../block/clicknav.js');
//##include('../block/updatewblogin.js');
//##include('../block/logout.js');

var $doc,
    $win,
    $filterDialog,
    $filterBtn,
    $content;

var _view = {
    init: function() {
        this.topScrollBanner();
        this.conMinH();
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
    conMinH:function () {
        // console.log($('.body-wrapper').css('margin-top'));
        $content.css('min-height',$win.height()-$('header').height()-$('footer').height()-parseFloat($('.body-wrapper').css('margin-top')));
    },
};

var _event = {
    bind: function() {
        //$filterDialog.on('touchmove',this.stopFilterDialogDefaultEvent);
        $filterBtn.on('click',this.showFilterDialog);

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
    $content=$('.body-wrapper').find('.content');
    init();
    updatewblogin.init();
    logout.init($('#logout'))
});
