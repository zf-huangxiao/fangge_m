/**
 * Created by veryside on 2017/2/10.
 */
window.onload=function () {
    var oBody=document.getElementsByTagName('body')[0];
    var vsBanner=document.createElement('div');
    var vsStr='';
    vsStr+='<a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.veryside_ard">';
    vsStr+='<img src="http://m.veryside.com/style/h5/images/guidepic/banner.jpg?v=1" alt="方格时尚">';
    vsStr+='</a>';
    vsStr+='<i></i>';
    vsBanner.innerHTML=vsStr;
    oBody.appendChild(vsBanner);
    vsBanner.style.setProperty('width','100%');
    vsBanner.style.setProperty('position','fixed');
    vsBanner.style.setProperty('left','0');
    vsBanner.style.setProperty('top','0');
    vsBanner.style.setProperty('z-index','100000');
    var oA=vsBanner.getElementsByTagName('a')[0];
    var oImg=oA.getElementsByTagName('img')[0];
    var oClose=vsBanner.getElementsByTagName('i')[0];
    oA.style.setProperty('display','block');
    oA.style.setProperty('width','100%');
    oImg.style.setProperty('display','block');
    oImg.style.setProperty('width','100%');
    oImg.style.setProperty('border','none');
    oClose.style.setProperty('display','block');
    oClose.style.setProperty('position','absolute');
    oClose.style.setProperty('top','0');
    oClose.style.setProperty('right','0');
    oClose.style.setProperty('width','48px');
    oClose.style.setProperty('height','48px');
    oClose.onclick=function () {
        vsBanner.style.setProperty('display','none');
    };
};
