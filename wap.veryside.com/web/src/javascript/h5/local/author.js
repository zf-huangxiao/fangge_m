//##include('../block/base.js');
//##include('../block/lazyload.js');
//##include('../block/doT.js');
//##include('../block/ajaxloadmore.js');
//##include('../block/swiper.js');
//##include('../block/filter-dialog.js');
//##include('../block/return-top.js');
//##include('../block/updatewblogin.js');
//##include('../block/logout.js');

var $doc,
    $win,
    $contentList,
    $filterDialog,
    $loadMore,
    id,
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
        })
    }
};

var _event = {
    bind: function() {
        //$filterDialog.on('touchmove',this.stopFilterDialogDefaultEvent);
        $loadMore.on('click',this.loadIndexList);
        //$filterBtn.on('click',this.showFilterDialog);
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
    loadIndexList : function(){

        ajaxloadmore.init({
            el : $contentList,
            async : false,
            url : '/baike/index_apis/zuozheloadlist?id='+id+'&p='+pageSize
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
    id= window.location.pathname.split("_")[1].split("/")[0];

    init();
    updatewblogin.init();
    logout.init($('#logout'))
});
