//##include('../block/base.js');
//##include('../block/lazyload.js');
//##include('../block/doT.js');
//##include('../block/swiper.js');
//##include('../block/filter-dialog.js');
//##include('../block/return-top.js');
//##include('../block/clicknav.js');
//##include('../block/updatewblogin.js');
//##include('../block/logout.js');

var $doc,
    $win,
    $filterDialog,
    $filterBtn;

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
        // $filterDialog.on('touchmove',this.stopFilterDialogDefaultEvent);
        // $filterBtn.on('click',this.showFilterDialog);
        $('.pindao').find('a.nohref'). on('click',this.showLists);

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
    showLists:function () {
        $(this).next().toggle();
    }

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
    init();
    updatewblogin.init();
    logout.init($('#logout'))
});
