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
    $filterBtn,
    type,
    id;

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
            url : '/baike/index_apis/indexloadlist?type='+type+'&id='+id+'&p='+pageSize,
            yCallback:function () {
            }  ,
            nCallback:function () {
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
    var str=window.location.pathname;
    if(/[a-z]+_(\d)+/.test(str)){

        str=/[a-z]+_(\d)+/.exec(str)[0];
        // console.log(str)
        switch (str.split('_')[0]){
            case 'brand' :
                type=1;
                id=str.split('_')[1];
                break;
            case 'yizhuang' :
                type=2;
                id=str.split('_')[1];
                break;
            case 'gainian' :
                type=3;
                id=str.split('_')[1];
                break;
            case 'caizhi' :
                type=4;
                id=str.split('_')[1];
                break;
            case 'xingren' :
                type=5;
                id=str.split('_')[1];
                break;
            case 'gouwudi' :
                type=6;
                id=str.split('_')[1];
                break;
            case 'jingxuanji' :
                type=7;
                id=str.split('_')[1];
                break;
            case 'zuozhe' :
                type=9;
                id=str.split('_')[1];
                break;
            default:

        }
    }
    init();
    updatewblogin.init();
    logout.init($('#logout'))
});
