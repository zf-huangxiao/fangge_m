//##include('../block/base.js');
//##include('../block/avatar.js');
//##include('../block/swiper.js');
//##include('../block/filter-dialog.js');
//##include('../block/calendar.js');
//##include('../block/logout.js');

var $doc,
    $win,
    $login_out,
    $nickName,
    $sex,
    $city,
    $saveUserInfo,
    $uploadAvaFile,
    $userAvatar,
    $dateHide,
    $filterDialog,
    $filterBtn,
    $birthday;

var dateVal = '';

var _view = {
    init: function() {
        //this.initDatepicker();
    },
    initDatepicker:function () {
        var tmpDate = '';
        var initDate = $dateHide.val();
        var dateArr = initDate.split('-');
        (dateArr[1].length < 2) && (dateArr[1] = '0' + dateArr[1]);
        (dateArr[2].length < 2) && (dateArr[2] = '0' + dateArr[2]);

        tmpDate = dateArr.join('-');
        $birthday.val(tmpDate)

    },
};

var _event = {
    bind : function() {
        $login_out.on('click',this.logout);
        $saveUserInfo.on('click',this.saveUserInfo);
        $uploadAvaFile.prev().on('click',this.clickChangeAvat);
        $userAvatar.on('click',this.clickChangeAvat);
        //$uploadAvaFile.on('change',this.upLoadAvatar);
        $uploadAvaFile.on('change',this.upLoadAvatarNew);
        $nickName.on('blur',this.hasContent);
        $birthday.on('change',this.setDate);
    },
    logout : function(){
        base.cache.clear_cookie('token');
        base.cache.clear_cookie('uid');
        base.cache.clear_cookie('nsessid');

        window.location.href = base.tools.getQueryString('url');
    },

    saveUserInfo : function(){
        var uid = base.cache.get_cookie('uid');
        var token = base.cache.get_cookie('token');
        if(uid && token){
            var name = $nickName.val();
            if(!name || /^ +$/.test(name)) return false;
            $.ajax({
                type: "POST",
                url : '/user/index_apis/userUpdate',
                data : {
                    nickname:$nickName.val(),
                    area:$city.val(),
                    sex:$sex.val(),
                    birthday:$birthday.val()

                },
                dataType: "json",
                success : function(data){

                    if(data.code == 200){
                        var returnUrlStr = window.location.search.replace('?url=','');
                        window.location.href = unescape(returnUrlStr);
                    }else{
                        alert(data.msg);
                    }
                }
            })
        }else{
            window.location.href='/';
        }


    },
    upLoadAvatarNew : function(){
        if(navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
            lrz(this.files[0],{width:500,height:500,quality:0.3})
                .then(function (rst) {
                    // 处理成功会执行
                    uploadPic(rst.base64);
                })
                .catch(function (err) {
                    // 处理失败会执行
                })
                .always(function () {
                    // 不管是成功失败，都会执行
                });
        }else{
            _event.upLoadAvatar();
        }


    },
    upLoadAvatar : function() {
        var formData = new FormData(),
            oFile = $uploadAvaFile[0].files[0],
            imgSize = oFile.size;

        // if(imgSize < 256 * 1024){
        //     formData.append($uploadAvaFile, oFile);
        //     console.log('formData===',formData);
        //uploadPic(formData, picNum);
        //} else {    // 图片压缩处理
        var reader = new FileReader(),
            maxWidth = 500,
            maxHeight = 500,
            suffix = oFile.name.substring(oFile.name.lastIndexOf('.') + 1);

        if (imgSize > 2 * 1024 * 1024) {
            maxWidth = 500;
            maxHeight = 500;
        }

        reader.onload = function (e) {
            var base64Img = e.target.result;
            //resize。
            var _ir = ImageResizer({
                resizeMode: "auto",
                dataSource: base64Img,
                dataSourceType: "base64",
                maxWidth: maxWidth, //允许的最大宽度
                maxHeight: maxHeight, //允许的最大高度。
                onTmpImgGenerate: function (img) {
                },
                success: function (resizeImgBase64, canvas) {
                    //var blob = dataURLtoBlob(resizeImgBase64);
                    // formData.append($uploadAvaFile, blob, oFile['name']);
                    uploadPic(resizeImgBase64);
                }
            });
        };
        reader.readAsDataURL(oFile);
        //}
    },
    hasContent : function () {
        var name = $(this).val();
        if(!name || /^ +$/.test(name)){
            $(this).siblings('.warning').text('请填写用户名!');
            $(this).focus();
        }else{
            $(this).siblings('.warning').text('');
        }
    },
    clickChangeAvat :function () {
        var uid = base.cache.get_cookie('uid');
        var token = base.cache.get_cookie('token');
        if(!uid || !token){
            window.location.href='/';
            return false;
        }
        $uploadAvaFile.click();
    },
    setDate : function(){
        //$dateHide.val();
        dateVal = $birthday.val().replace(/\-/g,'/')
    }

};

var _data = {};

function init() {
    _view.init();
    _event.bind();
}

function uploadPic(data) {
    //alert('base64data==',data);
    $.ajax({
        type: "POST",
        url : '/user/index_apis/userAvatar',
        data : {
            avatar:data
        },
        dataType: "json",
        success : function(data){

            if(data.code == 200){
                $userAvatar.attr('src', data.data.avatar + '?t='+ Math.random());
            }else{
                alert(data.msg);
            }
        }
    })
}

$(document).ready(function(){
    $doc = $(document);
    $win = $(window);
    $filterDialog = $('#filter-dialog');
    $filterBtn = $('#filter-btn');
    $birthday = $('#birthday');
    $login_out = $('#login_out');
    $nickName = $('#nickname');
    $sex = $('#gender');
    $city = $('#city');
    $saveUserInfo = $('#keep');
    $uploadAvaFile = $('#upload_ava_file');
    $userAvatar = $('#user_avatar');
    $dateHide = $('#date_hide');
    init();
    logout.init($('#logout'));

});
