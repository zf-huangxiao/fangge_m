$(document).ready(function(){

    $(document).on('click','.close-filter',function(){
        $('#filter-dialog').hide();
        $('body').css({'height':'auto','overflow-y':'auto'});
    });

    $(document).on('click','#filter-btn',function(){

        $filterDialog.show();
        $('body').css({'height':$(window).height(),'overflow-y':'hidden'});
        var mySwiperFilterBar = new Swiper('#swiper-container-bar',{
            watchSlidesProgress : true,
            watchSlidesVisibility : true,
            slidesPerView : 5,
            onTap: function(){
                mySwiperFilterCont.slideTo( mySwiperFilterBar.clickedIndex);
                $('#swiper-container-bar em').removeClass('show');
                $('#swiper-container-bar em').eq(mySwiperFilterCont.activeIndex).addClass('show');
            }
        });
        var mySwiperFilterCont = new Swiper('#swiper-container-content',{

            onSlideChangeStart: function(){
                updateNavPosition()
            }
        });

        function updateNavPosition(){
            //console.log(mySwiperFilterCont.activeIndex);
            $('#swiper-container-bar em').removeClass('show');
            $('#swiper-container-bar em').eq(mySwiperFilterCont.activeIndex).addClass('show');
            $('#swiper-container-bar .active-nav').removeClass('active-nav');
            var activeNav = $('#swiper-container-bar .swiper-slide').eq(mySwiperFilterCont.activeIndex).addClass('active-nav');

            if (!activeNav.hasClass('swiper-slide-visible')) {

                if (activeNav.index()>mySwiperFilterBar.activeIndex) {

                    var thumbsPerNav = Math.floor(mySwiperFilterBar.width/activeNav.width())-1;
                    mySwiperFilterBar.slideTo(activeNav.index()-thumbsPerNav)
                }
                else {

                    mySwiperFilterBar.slideTo(activeNav.index())
                }
            }
        }
    });
});
