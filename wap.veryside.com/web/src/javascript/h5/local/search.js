//##include('../block/base.js');
//##include('../block/doT.js');
//##include('../block/ajaxloadmore.js');
//##include('../block/swiper.js');
//##include('../block/filter-dialog.js');
//##include('../block/updatewblogin.js');
//##include('../block/logout.js');

var $doc,
    $win,
    $contentList,
    $filterDialog,
    $loadMore,
    $searchInput,
    $searchHide,
    $searchMain,
    $searchBtn,
    $searchTmpl,
    $searchResult,
    $searchDefault,
    $noSearchResult,
    $loadMoreWrapper,
    $searchTmplHide,
    $defaultList,
    $resultList,
    $noTips,
    $filterBtn;

var _view = {
    init: function() {
    },
};

var _event = {
    bind: function() {
        //$filterDialog.on('touchmove',this.stopFilterDialogDefaultEvent);
        $searchInput.on('input',this.initSearchList);
        $searchTmpl.on('click','a',this.choiceResultNew);
        $searchBtn.on('click',this.noAutoCompleteSearchResultNew);
        $loadMore.on('click',this.loadResultList);

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

    initSearchList : function(){

        if($searchInput.val() == ''){
            $searchTmpl.html('');
        }else{
            var url ='/search/index_apis/searchkeywords';
            var data = {
                'keyword':$searchInput.val()
            };
            var callback = function(data){
                var len = data.length;

                if(len > 0){

                    var temID = $searchTmpl.attr('temId');
                    var tmpl = $("#"+temID).html();
                    var doTtmpl = doT.template(tmpl);

                    $searchTmpl.show();
                    $noSearchResult.hide();
                    $searchTmpl.html(doTtmpl(data));
                }else{
                    $searchTmpl.html('');
                }
            };
            $.get(url , data , callback ,'json');
        }
    },

    choiceResultNew : function(){
        var _this = this;
        var _val = $(this).html();
        $searchTmpl.find('a').removeClass('red');
        $(this).addClass('red');
        $searchTmplHide.val(_val);
        pageSize = 2;

        setSearchParams(_val,true);

    },

    noAutoCompleteSearchResultNew : function(){
        $noSearchResult.show();
        setSearchParams($searchInput.val());

    },

    resetLoadStatus : function(){
        $loadMoreWrapper.children().removeClass('active');
        $loadMore.addClass('active');
    },

    loadResultList : function(){

        var keyword = null;
        if($searchTmplHide.val() != ''){
            keyword = $searchTmplHide.val();
        }else{
            keyword = $searchInput.val();
        }


        ajaxloadmore.init({
            el : $('#result-list'),
            loadNum : 10,
            async : false,
            url : '/search/index_apis/searchresult?keyword='+ keyword +'&p='+pageSize
        });
    }
};

function setSearchParams(param,bool){
    var _pathname = window.location.pathname;
    if(bool){
        window.location = _pathname + '?keyword=' + param + '&exact=1';
    }else{
        window.location = _pathname + '?keyword=' + param;
    }

}

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
    $searchMain = $('.search-main');
    $searchInput = $('#search-input');
    $searchBtn = $('#search-btn');
    $searchHide =$('#search-hide');
    $searchDefault = $('#search-default');
    $defaultList = $('#default-list');
    $searchResult = $('#search-result');
    $searchTmpl = $('#search-tmpl');
    $noSearchResult = $('#no-search-result');
    $loadMoreWrapper = $('.load-more-wrapper');
    $searchTmplHide = $('#search-tmpl-hide');
    $resultList = $('#result-list');
    $noTips = $('#no-tips');

    init();
    updatewblogin.init();
    logout.init($('#logout'))
});