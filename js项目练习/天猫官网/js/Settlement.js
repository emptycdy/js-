$(function () {

    $('.Leaving_left textarea').focus(function () {
        $(this).css({
            height: 50,
            borderColor: '#FFAD35'
        })
    })
    $('.Leaving_left textarea').blur(function () {
        $(this).css({
            height: 20,
            borderColor: '#ccc'
        })
    })

    function money() {
        let money = 0;
        $('.item_money').each(function (i, v) {
            let Subtotal = parseFloat($(this).text().slice(1));
            money += Subtotal;
        })
        $('.Leaving_right>span,.confirm>.Actual_payment>span').text('￥' + money.toFixed(2));
    }

    money();

    // 跳转
    $('.Submission>button').click(function () {
        window.location.href = 'payment.html';
    })
})