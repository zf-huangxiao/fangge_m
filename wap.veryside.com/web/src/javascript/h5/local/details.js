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
    $bigpH,
    $winH,
    $headerH,
    $contentList,
    $filterDialog,
    $loadMore,
    $bigP,
    $audio,
    $audCont,
    $filterBtn,
    type,
    id,
    $pOverHide,
    textStr,
    $dropDown;

var _view = {
    init: function() {
        this.posPlayer();
        this.dotDesc();
    },

    posPlayer:function () {
        if($audCont.length>0){
            var oLeft=$audCont.prev().offset().left+$audCont.prev().width();
            $audCont.css('left',oLeft);
        }
     },
    dotDesc:function () {
        if($pOverHide.length>0){
            var strLength = 0;
            for(var i=0;i<textStr.length;i++){
                if(/[\u3400-\u9FFF]/.test(textStr.charAt(i))){
                    strLength+=2;
                }else{
                    strLength+=1;
                }
                if(strLength>90){
                    var newVal=textStr.substr(0,i+1)+'......';
                    $pOverHide.find('span').text(newVal);
                    return false;
                }
            }

        }

    }

};

var _event = {
    bind: function() {
        $loadMore.on('click',this.loadIndexList);
        $bigP.on('click',this.clickBigP);
        $audCont.on('click',this.controlAudio);
        $audio.length>0?$audio[0].onpause=this.audioPaused:'';
        $dropDown.length>0?$dropDown.on('click',this.clickDropDown):'';
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
        });
    },
    clickBigP:function () {
        if($(this).hasClass('enlarge')){
            $(this).removeClass('enlarge');
            $(this).animate({height:$bigpH+'px'},500);
            $('html,body').animate({scrollTop:0},500);

        }else{
            $(this).addClass('enlarge');
            $(this).animate({height:$winH+'px'},500);
            $('html,body').animate({scrollTop:$headerH+'px'},500);
        }
    },
    controlAudio:function () {
        if($(this).hasClass('playing')){
            $audio[0].pause();
        }else{
            $(this).addClass('playing');
            $audio[0].play();
        }
    },
    audioPaused:function () {
        $audCont.removeClass('playing');
    },
    clickDropDown:function () {
        $pOverHide.find('span').text(textStr);
        $pOverHide.removeClass('over-h');
        $('.hide-box').length > 0?$('.hide-box').removeClass('hide-box') :'';
        $(this).hide();
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
    $winH = $win.height();
    $headerH = $('header').height();
    $filterDialog = $('#filter-dialog');
    $filterBtn = $('#filter-btn');
    $loadMore = $('#load-more-btn');
    $bigP = $('.introduce a.bigP');
    $bigpH = $bigP.height();
    $audio = $('.title audio');
    $contentList = $('#content-list');
    $audCont=$('.title .audio_control');
    $pOverHide = $('p.over-h');
    textStr = $pOverHide.find('span').text();
    $dropDown = $('#drop-down');
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
