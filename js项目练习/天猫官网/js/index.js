$(function () {

    // 轮播图
    var count = 0;
    $('.Rotation_content>ol>li').click(function () {
        count = $(this).index();
        $('.Rotation_content>ol>li').eq(count).addClass('olactive').siblings().removeClass('olactive');
        $('.Rotation_content>ul>li').eq(count).fadeIn().siblings().fadeOut();
    })
    $('.Rotation_content').mouseenter(function () {
        clearInterval(setTime);
    })
    $('.Rotation_content').mouseleave(function () {
        setTime = setInterval(time, 2000);
    })
    var setTime = setInterval(time, 2000);

    function time() {
        count++;
        if (count >= 4) {
            count = 0;
        }
        $('.Rotation_content>ol>li').eq(count).click();
    }

    //猫耳朵
    $('.product_nav .produce_item').mouseenter(function () {
        var left = $(this).position().left;
        var width = this.offsetWidth;
        var proleft = left + width / 2;
        $('#catear').css('left', proleft).stop().fadeIn(500);
    })
    $('.product_nav .produce_item').mouseleave(function () {
        $('#catear').stop().fadeOut(500);
    })

    // 左侧tab
    $('.classification_nav>li').mouseenter(function () {
        var index=$(this).index();
        $('.classification_item').eq(index).show().siblings('ol').hide();
    })
    $('.classification_nav>li').mouseleave(function () {
        $('.classification_item').hide();
    })
    $('.classification_item').mouseenter(function () {
        $(this).show();
    })
    $('.classification_item').mouseleave(function () {
        $(this).hide();
    })



})
























