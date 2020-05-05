$(function () {

    // 全选
    $('.checkAll').click(function () {
        Check(this);
        $('.checkAll>img,.check>img').attr('src', $(this).children().attr('src'));
        $('.checkAll>img,.check>img').attr('selectit', $(this).children().attr('selectit'));
        Settlement();
    })

    // 单选
    $('.check').click(function () {
        Check(this);
        var num = 0;
        $('.check').each(function (index, item) {
            if ($(item).children()[0].getAttribute('selectit') == 'true') {
                num++;
            } else {
                num--;
                if (num <= 0) {
                    num = 0;
                }
            }
        })
        if (num == document.querySelectorAll('.check').length) {
            $('.checkAll').children()[0].setAttribute('selectit', 'true');
            $('.checkAll').children().attr('src', '../image/cartSelected.png');
        } else {
            $('.checkAll').children()[0].setAttribute('selectit', 'false');
            $('.checkAll').children().attr('src', '../image/cartNotSelected.png');
        }
        Settlement();
    })

    // 数量+-
    $('.reduct').click(function () {
        if ($(this).siblings('input')[0].value <= 1) {
            $(this).siblings('input')[0].value = 1;
        } else {
            $(this).siblings('input')[0].value--;
        }
        Subtotal();
        Settlement();
    })
    $('.add').click(function () {
        $(this).siblings('input')[0].value++;
        Subtotal();
        Settlement();
    })
    $('.number>input').blur(function () {
        Subtotal();
        Settlement();
    })

    // 删除
    $('.remove').click(function () {
        $(this).parent().parent().remove();
    })

    // 选中
    function Check(ele) {
        if ($(ele).children().attr('selectit') == 'false') {
            $(ele).children().attr('selectit', 'true');
            $(ele).children().attr('src', '../image/cartSelected.png');
        } else {
            $(ele).children().attr('selectit', 'false');
            $(ele).children().attr('src', '../image/cartNotSelected.png');
        }
    }

    // 结算
    function Settlement() {
        var money = 0;
        var price;
        var num = 0;
        $('.check').each(function (i, v) {
            if ($(this).children().attr('selectit') == 'true') {
                price = parseFloat($(this).parent().siblings('.Amount_money').text().slice(1));
                money += price;
                num += parseInt($(this).parent().siblings('.cart_num').children().children('input').val());
            }
        })
        $('.Settlement_content>strong,.Selected_smitems>strong').text('￥' + money.toFixed(2));
        $('.Settlement_content>span').text(num);
        if (num != 0) {
            $('.Selected_smitems>button,.Settlement_content>button').css('background', '#C40000').attr('disabled', false);
        } else {
            $('.Selected_smitems>button,.Settlement_content>button').css('background', '#AAAAAA').attr('disabled', true);
        }
    }

    // 小计
    function Subtotal() {
        $('.check').each(function (i, v) {
            var num = $(this).parent().siblings('.cart_num').children().children('input').val();
            var price = $(this).parent().siblings('.Unit_Price').children('.Unit_money').text().slice(1);
            var money = (price * num).toFixed(2);
            $(this).parent().siblings('.Amount_money').text('￥' + money);
        })
    }

    // 跳转
    $('.Settlement_content>button,.Selected_smitems>button').click(function () {
        window.location.href='Settlement.html';
    })
})