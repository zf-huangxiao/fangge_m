;(function () {
    var $ellipsis,$value,$len;
    window.onload=function () {
        $ellipsis=$('.ellipsis');
        $value=$ellipsis.text();
        $len=$value.length;
        var strLength=0;

        for(var i=0;i<$len;i++){
            if(/[\u3400-\u9FFF]/.test($value.charAt(i))){
                strLength+=2;
            }else{
             strLength+=1;
            }
            while(strLength>90){
                var newVal=$value.substr(0,i+1)+'......';
                $ellipsis.text(newVal);
                return false;
            }
        }
    }

})();