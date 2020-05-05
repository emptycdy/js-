$(function () {

    // tab栏
    $('.details_Titdetails').click(function () {

        $(this).addClass('active').siblings().removeClass('active');
        $('.detail').show().siblings('.evaluate').hide();
    })
    $('.Cumulative_evaluation').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        $('.detail').hide().siblings('.evaluate').show();
    })

    // 缩略图
    $('.purchase_leftsmImg>img').mouseenter(function () {
        $(this).css('borderColor', 'black');
        $('.purchase_leftImg>img').attr('src', $(this).attr('src'));
    })
    $('.purchase_leftsmImg>img').mouseleave(function () {
        $(this).css('borderColor', 'transparent');
    })

    // 修改商品数量
    $('.purchase_right .add').click(function () {
        $('.number>input')[0].value++;
    })
    $('.purchase_right .reduce').click(function () {
        if ($('.number>input')[0].value <= 0) {
            $('.number>input')[0].value = 0;
        } else {
            $('.number>input')[0].value--;
        }
    })
})