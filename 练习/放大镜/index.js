window.onload = function () {


    var preview_img = document.querySelector('.preview_img');
    var mask = document.querySelector('.mask');
    var big = document.querySelector('.big');
    preview_img.addEventListener('mouseover', function () {
        mask.style.display = 'block';
        big.style.display = 'block';
    })
    preview_img.addEventListener('mouseout', function () {
        mask.style.display = 'none';
        big.style.display = 'none';
    })

    preview_img.addEventListener('mousemove', function (e) {
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        var maskX = x - mask.offsetWidth / 2;
        var maskY = y - mask.offsetHeight / 2;
        var w = preview_img.offsetWidth - mask.offsetWidth;
        var h = preview_img.offsetHeight - mask.offsetHeight;
        if (maskX <= 0) {
            maskX = 0;
        } else if (maskX >= w) {
            maskX = w;
        }
        if (maskY <= 0) {
            maskY = 0;
        } else if (maskY >= h) {
            maskY = h;
        }
        mask.style.left = maskX + 'px';
        mask.style.top = maskY + 'px';
        //大图片移动距离=遮挡层移动距离*大图片最大移动距离/遮挡层最大移动距离
        var bigimg = document.querySelector('.bigimg');
        var bigMax = bigimg.offsetWidth - big.offsetWidth;
        var bigX = maskX * bigMax / w;
        var bigY = maskY * bigMax / h;
        bigimg.style.left = -bigX + 'px';
        bigimg.style.top = -bigY + 'px';
    })




















}