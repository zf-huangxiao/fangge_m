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
    $letters,
    $brandsHead,
    $brandsBlock,
    offsetT,
    $returnTop;

var _view = {
    init: function () {
        this.topScrollBanner();
        this.firstBeRed();
        this.initWhiteBlock();
    },


    topScrollBanner: function () {
        var topBannerSwiper = new Swiper('.swiper-top-banner', {
            pagination: '.top-banner-pagination',
            // paginationType : 'custom',
            // paginationCustomRender: function (swiper, current, total) {
            //     return current + ' of ' + total;
            // }
        })
    },
    firstBeRed: function () {
        $('.logos').find('.letter').eq(0).addClass('current');
    },
    initWhiteBlock: function () {
        $brandsBlock.css({'height': $brandsHead.height()});
    },
};

var _event = {
    bind: function () {
        // $filterDialog.on('touchmove',this.stopFilterDialogDefaultEvent);
        $filterBtn.on('click', this.showFilterDialog);
        $letters.on('click', 'a[href]', this.beRed);
        $letters.on('click', 'a[href]', this.positionContent);
        $win.on('scroll', this.positionLetters);
        $brandsHead.on('touchmove', function (e) {
            $(this).hasClass('letters-fixed') ? e.preventDefault() : '';
        });
        $returnTop.on('click',this.clickReturnTop);
    },
    stopFilterDialogDefaultEvent: function (e) {

        e.preventDefault && e.preventDefault();
        e.returnValue = false;
        e.stopPropagation && e.stopPropagation();
        return false;
    },

    showFilterDialog: function () {
        $filterDialog.show();
    },
    beRed: function (e) {
        $('.letters').find('a.current').removeClass('current');
        $('.logos').find('.current').removeClass('current');
        $(this).addClass('current');
        $('.logos').find('span.letter').eq($(this).parent().index()).addClass('current');
    },
    positionLetters: function () {
        var scrollT = $win.scrollTop();
        if (scrollT >= offsetT) {
            $brandsBlock.show();
            $brandsHead.addClass('letters-fixed');

        } else {
            $brandsBlock.hide();
            $brandsHead.removeClass('letters-fixed');
        }
        $('.logos').children('div').each(function (index, cur) {
            var thisOffSetT = $(this).offset().top,
                thisHeight=$(this).height(),
                topHeight = $brandsHead.height();
            if (scrollT + topHeight > thisOffSetT && scrollT + topHeight < thisOffSetT + thisHeight) {
                $(this).parent().find('span.current').removeClass('current');
                $(this).children('.letter').addClass('current');
                $letters.find('a.current').removeClass('current');
                $letters.find('li a').eq(index).addClass('current');
                return false;
            }
        })
    },
    positionContent: function () {
        var oIndex = $(this).parent().index();
        var offsetT = $('.logos>div').eq(oIndex).offset().top;
        $win.scrollTop(offsetT - $brandsHead.height());
    },
    clickReturnTop:function () {
        $brandsHead.find('ul li a.current').removeClass('current');
        $brandsHead.find('ul li a').eq(0).addClass('current');
        $('.logos').children('div').find('span.current').removeClass('current');
        $('.logos').children('div').find('span.letter').eq(0).addClass('current');

    }

};

var _data = {};

function init() {
    _view.init();
    _event.bind();
}

$(document).ready(function () {
    $doc = $(document);
    $win = $(window);
    $filterDialog = $('#filter-dialog');
    $filterBtn = $('#filter-btn');
    $brandsHead = $('.letters');
    $letters = $('.letters ul');
    $brandsBlock = $('.brands-block');
    offsetT = $brandsHead.offset().top;
    $returnTop = $('.return-top');

    init();
    // (function () {
    //     $('.logos').children('div').each(function (index,cur) {
    //         $(this).attr('thisOffSetT',$(this).offset().top);
    //     })
    // })()
    updatewblogin.init();
    logout.init($('#logout'))

});
