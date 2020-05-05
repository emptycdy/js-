window.onload = function () {


    var div_img = document.querySelector('.div_img');
    var left = document.querySelector('.left');
    var right = document.querySelector('.right');
    var imgWith = div_img.offsetWidth;
    div_img.addEventListener('mouseenter', function () {
        left.style.display = 'block';
        right.style.display = 'block';
        clearInterval(timer);
        timer = null;
    });
    div_img.addEventListener('mouseleave', function () {
        left.style.display = 'none';
        right.style.display = 'none';
        timer = setInterval(function () {
            right.click();  //手动调用点击事件
        }, 2000);
    });

    var ul = document.querySelector('ul');
    for (i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        li.setAttribute('index', i);
        var ol = document.querySelector('.circle');
        ol.appendChild(li);
        li.addEventListener('click', function () {
            for (j = 0; j < ol.children.length; j++) {
                ol.children[j].className = '';
            }
            this.className = 'current';
            var index = this.getAttribute('index');
            num = index;
            circle = index;
            animate(ul, -index * imgWith);
        })
    }
    ol.children[0].className = 'current';

    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    var num = 0;
    var circle = 0;
    var flag = true;
    right.addEventListener('click', function () {
        if (flag == true) {
            flag = false;
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -imgWith * num, function () {
                flag = true;
            });
            circle++;
            if (circle == ol.children.length) {
                circle = 0;
            }
            circleChange();
        }
    })
    left.addEventListener('click', function () {
        if (flag == true) {
            flag = false;
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * div_img.offsetWidth + 'px';
            }
            num--;
            animate(ul, -imgWith * num, function () {
                flag = true;
            });
            circle--;
            circle = circle < 0 ? ol.children.length - 1 : circle;
            circleChange();
        }

    })

    function circleChange() {
        for (i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    }

    var timer = setInterval(function () {
        right.click();  //手动调用点击事件
    }, 2000)



}