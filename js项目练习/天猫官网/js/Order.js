$(function(){

    // tab
    $('.state>div').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        var that=this;
        $('.Order_details').each(function (i,v) {
            if($(v).attr('active')==$(that).attr('active')){
                $(v).show();
            }else if($(that).attr('active')=='all'){
                $(v).show();
            }else{
                $(v).hide();
            }
        })
    })

    // 删除
    $('.Trash>span').click(function () {
        $(this).parent().parent().parent().remove();
    })

    // 跳转
    $('.Receiving').click(function () {
        window.location.href='receipt.html';
    })
    $('.Evaluate').click(function () {
        window.location.href='evaluate.html';
    })
    $('.payment').click(function () {
        window.location.href='payment.html';
    })



})