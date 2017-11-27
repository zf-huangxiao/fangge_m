//左右padding要一样
var $aEles, spaWidth, $contain, scrollL, $this, index;

$(document).ready(function () {
    $aEles = $('nav').find('a');
    $contain = $('.top-menu-list');
    $this = $('.active');
    index = $this.index();
    spaWidth = $aEles.eq(1).offset().left - $aEles.eq(0).width() - Number($aEles.eq(0).css('padding-right').split('px')[0]) * 2;
    scrollL = 0;

    $this[0].posL = 0;
    $this[0].posR = 0;
    //posL是当前项的中线到父元素最左边的距离，posR是当前项中线到父元素的最右边的距离


    if (index === 0) {
        $this[0].posL += $this.width() / 2 + Number($this.css('padding-right').split('px')[0]);
        for (var i = 1; i < $aEles.length; i++) {
            $this[0].posR += $aEles.eq(i).width() + Number($aEles.eq(i).css('padding-right').split('px')[0]) * 2 + spaWidth;
        }
        $this[0].posR += $this.width() / 2 + Number($this.css('padding-left').split('px')[0]);

    } else if (index === $aEles.length - 1) {
        $this[0].posR += $this.width() / 2 + Number($this.css('padding-right').split('px')[0]);
        for (var i = 0; i < $aEles.length - 1; i++) {
            $this[0].posL += $aEles.eq(i).width() + Number($aEles.eq(i).css('padding-right').split('px')[0]) * 2 + spaWidth;
        }
        $this[0].posL += $this.width() / 2 + Number($this.css('padding-left').split('px')[0]);

    } else {
        for (var i = 0; i < index; i++) {
            $this[0].posL += $aEles.eq(i).width() + Number($aEles.eq(i).css('padding-right').split('px')[0]) * 2 + spaWidth;
        }
        $this[0].posL += $this.width() / 2 + Number($this.css('padding-left').split('px')[0]);
        for (var k = index + 1; k < $aEles.length; k++) {
            $this[0].posR += $aEles.eq(k).width() + Number($aEles.eq(k).css('padding-right').split('px')[0]) * 2 + spaWidth;
        }
        $this[0].posR += $this.width() / 2 + Number($this.css('padding-left').split('px')[0]);
    }

    if ($this[0].posL > $(window).width() / 2 && $this[0].posR > $(window).width() / 2) {
        scrollL += $this.offset().left + $this.width() / 2 + Number($this.css('padding-right').split('px')[0]) - $(window).width() / 2;
        $contain.scrollLeft(scrollL);
        // console.log(scrollL, "1111")

    } else if ($this[0].posL < $(window).width() / 2) {
        scrollL = 0;
        $contain.scrollLeft(scrollL);
        // console.log(scrollL, "2222")
    } else if ($this[0].posR < $(window).width() / 2) {
        for (var i = 0, pos = 0; i < $aEles.length; i++) {
            pos += $aEles.eq(i).width() + Number($aEles.eq(i).css('padding-right').split('px')[0]) * 2 + spaWidth;
        }
        pos = pos - spaWidth;
        scrollL = pos - $(window).width();
        $contain.scrollLeft(scrollL);
        // console.log(scrollL, "333")
    } else {
    }

});
