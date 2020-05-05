$(function () {
    // 范围价格排序

    $('.endPrice,.beginPrice').keyup(function (e) {
        let beginval=$('.beginPrice').val();
        let endval=$('.endPrice').val();
        if(e.keyCode==13){
            $('.Product_price>span').each(function(i,v){
                if(parseFloat($(this).text())>=beginval&&parseFloat($(this).text())<=endval){
                    $(this).parent().parent().show();
                }else{
                    $(this).parent().parent().hide();
                }
            })

        }
    })
    $('.endPrice,.beginPrice').blur(function () {
        let beginval=$('.beginPrice').val();
        let endval=$('.endPrice').val();
        if(beginval.trim()==''||endval.trim()==''){
            $('.item').show();
        }
    })

})