$(document).ready(function(){
    var $doc = $(document),
        $win = $(window),
        $returnTop = $('.return-top');
    // console.log($returnTop.height(),'----------');
    $returnTop.css('bottom',$('footer').height()+parseFloat($returnTop.css('right')));
    $win.on('scroll',function(){
        if($(this).scrollTop() >= $(this).height() * 2){
            $returnTop.show();
        }else{
            $returnTop.hide();
        }
    });

    // $doc.on('click','.return-top',function(){
    //     $("html,body").animate({scrollTop:0}, 200);
    // }) ;
});