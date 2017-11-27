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
    endEleTime,
    $filterBtn,
    $topPic;

var _view = {
    init: function() {
    },

};

var _event = {
    bind: function() {
        $loadMore.on('click',this.loadIndexList);
        $topPic.on('click',this.showItems);
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

        if(!$contentList.find('section').last().attr('data-time') || $contentList.find('section').last().attr('data-time') == 'undefined'){
            endEleTime = 0;
        }else{
            endEleTime = $contentList.find('section').last().attr('data-time')
        }
        var type;
        if(/\/shizhuangzhou\//.test(window.location.pathname)){
            type = 2;
        }else if(/\/jiepai\//.test(window.location.pathname)){
            type = 1;
        }
        ajaxloadmore.init({
            el : $contentList,
            async : false,
            url : '/shizhuang/index_apis/jiepaizonghelist?type=' + type + '&p='+pageSize+'&time='+endEleTime,
        });
    },
    showItems:function () {
        $(this).next('ul').show();
        $(this).children('em').hide();
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
    $topPic = $('.top-classify').find('.top-pic');

    init();
    updatewblogin.init();
    logout.init($('#logout'))
});
