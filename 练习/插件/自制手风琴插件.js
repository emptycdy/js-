$.fn.accordion = function (colors, width) {
    colors = colors || [];
    width = width || 0;
    var $li = this.find('li');
    var boxLength = this.width();
    var maxLength = boxLength - ($li.length - 1) * width;
    var avgLength = boxLength / $li.length;
    $li.each(function (i, e) {
        $(e).css('background', colors[i]);
    })
    $li.mouseenter(function () {
        $(this).stop().animate({ width: maxLength }).siblings().stop().animate({ width: width });
    })
    $li.mouseleave(function () {
        $li.stop().animate({ width: avgLength })
    })
}