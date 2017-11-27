//##include('../block/base.js');
//##include('../block/doT.js');
//##include('../block/swiper.js');
//##include('../block/filter-dialog.js');
//##include('../block/updatewblogin.js');
//##include('../block/logout.js');

var $doc,
    $win,
    $filterDialog,
    $button,
    $box,
    $filterBtn;

var _view = {
};

var _event = {
    bind: function() {
        //$filterDialog.on('touchmove',this.stopFilterDialogDefaultEvent);
        //$filterBtn.on('click',this.showFilterDialog);
        $button.on('click',this.clickButton);
    },
    stopFilterDialogDefaultEvent:function(e){

        e.preventDefault && e.preventDefault();
        e.returnValue=false;
        e.stopPropagation && e.stopPropagation();
        return false;
    },

    showFilterDialog:function(){
        $filterDialog.show();
    } ,
    clickButton:function () {
        var message= $('.feedback').find('textarea').val();
        var contact=$('.contactway').find('input').val();
        var uid='0';
        clearTimeout();
        if(message==''||/^ +$/.test(message)||/^\n+$/.test(message)){

            $box.html('请输入您的建议！').show();
            setTimeout(function () {
                $box.hide()
            },1000);
            return false;
        }else if(!/^1[34578]\d{9}$/.test(contact)&&!/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(contact)){
            $box.html('请输入正确的联系方式！').show();
            setTimeout(function () {
                $box.hide()
            },1000);
            return false;
        }
        $.ajax({
            type:'post',
            url: '/feedback/index_apis/indexloadlist',
            data:{message:message,uid:uid,contact:contact},
            async : false,
            dataType: '',
            success: function(data){
                $box.html('提交成功！').show();
                setTimeout(function () {
                    $box.hide()
                },1000);
            },
            error: function(){
                console.log('Ajax error!');
            }
        });
        $('textarea').val('');
        $('input').val('');
    },

};

var _data = {};

function init() {
    _event.bind();
}

$(document).ready(function(){
    $doc = $(document);
    $win = $(window);
    $filterDialog = $('#filter-dialog');
    $filterBtn = $('#filter-btn');
    $button=$('button');
    $box=$('.box');
    init();
    updatewblogin.init();
    logout.init($('#logout'))
});
