//##include('../block/photoswipe.js');
//##include('../block/photoswipe-ui-default.js');
//##include('../block/initphotoswiper.js');

var $doc,
    $win,
    $gallery,
    items,
    $downLoadBtn,
    $cusCloseBtn,
    $pswpCaption,
    $pswpCaptionT,
    $pswpCaptionH,
    $touchFlag,
    $touchStartAndTargetTopDiff,
    $winH,
    $tmpH = 154,
    $pswpCaptionCenter,
    startX,
    startY,
    moveEndX,
    moveEndY,
    X,
    Y;

var _view = {

    init: function() {
        //initPhotoSwipeIndex('.my-gallery');
        //this.getItems();
        // this.initCaptionPos();
        //this.initClickOpenGallery();
    },

    getItems : function(){
        var urls = window.location.href;
        var url_params = urls.substring(parseInt(urls.lastIndexOf('/')+1));
        var id = url_params.split('_')[0];
        $.ajax({
            type: 'GET',
            url: '/photoviewarticle/items_apis/itemlist?id='+id,
            dataType: 'json',
            success: function(data){

                //console.log('data',data);
                var len = data.list.length;
                //console.log('len',len);

                if(len > 0){
                    items = data.list;
                }else{
                    items = []
                }
                console.log(items);
            },
            error: function(){
                console.log('Ajax error!');
            }
        });
    },

    //初始caption距离顶部的距离
    initCaptionPos:function(){
        // $winH = $(window).height();
        // //存取滑动对象距离顶部的距离
        // $pswpCaptionT = $pswpCaption.offset().top;
        // $pswpCaption.css('top',$winH - $tmpH);
    },

    initClickOpenGallery : function(){
        var getHash = window.location.href.substring(parseInt(window.location.href.lastIndexOf('/')+1));
        var getPid = getHash.split('_')[1];
        var currEle = '#n'+getPid;
        $(currEle).click();
    },

    initDownLoadHref : function(gallery){
        $downLoadBtn.attr('href','veryside://link?type=103&p='+gallery.currItem.src);
    }
};

var _event = {

    bind: function() {
        // $pswpCaption.on('touchstart',this.ctrlCaptionStart);
        // $pswpCaption.on('touchmove',this.ctrlCaptionMove);
        // $pswpCaption.on('touchend',this.ctrlCaptionEnd);

        $downLoadBtn.on('touchstart',this.stopBubble);
        $downLoadBtn.on('touchmove',this.stopBubble);
        $downLoadBtn.on('touchend',this.stopBubble);
        $downLoadBtn.on('click',this.stopBubble);

        $cusCloseBtn.on('touchstart',this.stopBubble);
        $cusCloseBtn.on('touchmove',this.stopBubble);
        $cusCloseBtn.on('touchend',this.stopBubble);
        $cusCloseBtn.on('click',this.stopBubble);
    },
    stopBubble : function(e){
        //e.preventDefault();
        e.stopPropagation();
    },

    ctrlCaptionStart:function(e){
        e.preventDefault();
        startX = e.touches[0].pageX,
            startY = e.touches[0].pageY;

        //开始滑动时存取滑动对象的高度。
        $pswpCaptionH = $pswpCaptionCenter.height();
        $touchStartAndTargetTopDiff = parseInt(Math.abs(startY)) - $pswpCaption.offset().top;
        e.stopPropagation();
    },
    ctrlCaptionMove:function(e){
        e.preventDefault();
        moveEndX = e.touches[0].pageX,
            moveEndY = e.touches[0].pageY,
            X = moveEndX - startX,
            Y = moveEndY - startY;

        if ( Math.abs(Y) > Math.abs(X) && Y > 0) {
            //top 2 bottom
            $pswpCaption.css('top',parseInt(Math.abs(moveEndY) - $touchStartAndTargetTopDiff));


            if($pswpCaption.offset().top >= $winH - $tmpH){
                $pswpCaption.css('top',$winH - $tmpH);
                return false;
            }else{
                $pswpCaption.css('top',parseInt(Math.abs(moveEndY) - $touchStartAndTargetTopDiff));
            }
        } else if ( Math.abs(Y) > Math.abs(X) && Y < 0 ) {
            //bottom 2 top
            if($pswpCaption.offset().top <= parseInt($(window).height() - $pswpCaptionH - $tmpH)){
                $pswpCaption.css('top',parseInt($(window).height() - $pswpCaptionH - $tmpH));
                return false;
            }else{
                $pswpCaption.css('top',parseInt(Math.abs(moveEndY) - $touchStartAndTargetTopDiff));
            }
        }
        else{
            //just touch
        }
        e.stopPropagation();
    },
    ctrlCaptionEnd:function(e){
        e.preventDefault();
        e.stopPropagation();
        return false;

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
    $gallery = $('.my-gallery');
    $pswpCaption = $('.pswp__caption');
    $pswpCaptionCenter = $('.pswp__caption__center');
    $touchFlag = $('.touch-flag');
    $downLoadBtn = $('.down__load__btn');
    $cusCloseBtn = $('.cus__close__btn');

    init();

    function getItems(){
        var urls = window.location.href;
        var pathName = window.location.pathname;
        var fnName = pathName.substring(1,pathName.lastIndexOf('/'));
        var url_params = urls.substring(parseInt(urls.lastIndexOf('/')+1));
        var id = url_params.split('.')[0].split('_')[1];
        var itemType = null;

        if(pathName.indexOf('picture_') != -1){
            itemType = 'itemlist_article'
        }else if(pathName.indexOf('good_') != -1){
            itemType = 'itemlist_good'
        }

        $.ajax({
            type: 'GET',
            url: '/'+ fnName +'/index_apis/'+ itemType +'?id='+id,
            dataType: 'json',
            success: function(data){

                var len = data.list.length;

                if(len > 0){
                    items = data.list;
                }else{
                    items = []
                }

                initPhotoSwipeDefault(_view.initCaptionPos,_view.initDownLoadHref,items);
                $win.on('resize',function(){
                    initPhotoSwipeDefault(_view.initCaptionPos,_view.initDownLoadHref,items);
                });
                $doc.click();

            },
            error: function(){
                console.log('Ajax error!');
            }
        });
    }

    getItems();


});