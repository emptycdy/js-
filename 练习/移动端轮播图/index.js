window.addEventListener('load', function () {


    var div_img = document.querySelector('.div_img');
    var ul = document.querySelector('ul');
    var ol = document.querySelector('ol');
    var w = div_img.offsetWidth;
    var num = 0;
    var timer = setInterval(function () {
        num++;
        var translatex = -num * w;
        ul.style.transform = 'translateX(' + translatex + 'px)';
        ul.style.transition = '.3s';

    }, 2000);

    ul.addEventListener('transitionend', function () {
        if (num >= 3) {
            num = 0;
            ul.style.transition = 'none';
            var translatex = -num * w;
        } else if (num < 0) {
            num = 2;
            ul.style.transition = 'none';
            var translatex = -num * w;
        }
        ol.querySelector('.current').classList.remove('current');
        ol.children[num].classList.add('current');
    });

    var startx = 0;
    var movex = 0;
    ul.addEventListener('touchstart', function (e) {
        startx = e.targetTouches[0].pageX;
        clearInterval(timer);
    })
    ul.addEventListener('touchmove', function (e) {
        movex = e.targetTouches[0].pageX - startx;
        var translatex = -num * w + movex;
        ul.style.transform = 'translateX(' + translatex + 'px)';
        ul.style.transition = 'none';
        flag = true;
        e.preventDefault();
    })
    ul.addEventListener('touchend', function (e) {
        if (flag) {
            if (Math.abs(movex) > 50) {
                if (movex > 0) {
                    num--;
                } else {
                    num++;
                }
                var translatex = -num * w;
                ul.style.transform = 'translateX(' + translatex + 'px)';
                ul.style.transition = '.3s';
            } else {
                var translatex = -num * w;
                ul.style.transform = 'translateX(' + translatex + 'px)';
            }
        }
        timer = setInterval(function () {
            num++;
            var translatex = -num * w;
            ul.style.transform = 'translateX(' + translatex + 'px)';
            ul.style.transition = '.3s';
        }, 2000);
    })





























})