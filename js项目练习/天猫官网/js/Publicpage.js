$(function () {
    $('.top_nav>.topLeft>a:nth-of-type(1)').click(function () {
        window.location.href='index.html';
    })
    $('.top_nav>.topLeft>a:nth-of-type(2)').click(function () {
        window.location.href='login.html';
    })
    $('.top_nav>.topLeft>a:nth-of-type(3)').click(function () {
        window.location.href='register.html';
    })
    $('.footer a').click(function () {
        alert('这是假的别点了兄弟')
    })
})