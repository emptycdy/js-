const time = document.querySelector('#time'),
    greeting = document.querySelector('#greeting'),
    uname = document.querySelector('#name'),
    plan = document.querySelector('#plan');

//showtime显示时间
function showtime() {
    let today = new Date();
    const hour = today.getHours();
    const minute = today.getMinutes();
    const second = today.getSeconds();
    time.innerHTML = `${addZero(hour)}<span>:</span>${addZero(minute)}<span>:</span>${addZero(second)}`;
    setTimeout(showtime, 1000);
}


function addZero(n) {
    return n < 10 ? '0' + n : n;
}

//设置背景问候语
function setBgGreet() {
    let today = new Date();
    let hour = today.getHours();
    if (hour < 12) {
        document.body.style.background = 'url(img/moring.jpg) no-repeat center center/cover';
        greeting.textContent = '早上好,';
    } else if (hour == 12) {
        document.body.style.background = 'url(img/noon.jpg) no-repeat center center/cover';
        greeting.textContent = '中午好,';
    } else if (hour < 18) {
        document.body.style.background = 'url(img/afternoon.jpg) no-repeat center center/cover';
        greeting.textContent = '下午好,';
    } else {
        document.body.style.background = 'url(img/night.jpg) no-repeat center center/cover';
        greeting.textContent = '晚上好,';
    }
}

//获得本地姓名
function getName() {
    if (localStorage.getItem('name') === null || localStorage.getItem('name') === '') {
        uname.textContent = '...';
    } else {
        uname.textContent = localStorage.getItem('name');
    }
}

//获得本地计划
function getPlan() {
    if (localStorage.getItem('plan') === null || localStorage.getItem('plan') === '') {
        plan.textContent = 'Plan?';
    } else {
        plan.textContent = localStorage.getItem('plan');
    }
}

//设置姓名
function setName(e) {
    if (e.type === 'keypress') {
        if (e.keyCode == 13 || e.which == 13) {
            localStorage.setItem('name', e.target.innerText);
            uname.blur();
        }
    } else {
        localStorage.setItem('name', e.target.innerText);
    }
}

//设置计划
function Plan(e) {
    if (e.type === 'keypress') {
        if (e.keyCode == 13 || e.which == 13) {
            localStorage.setItem('plan', e.target.innerText);
            plan.blur();
        }
    } else {
        localStorage.setItem('plan', e.target.innerText);
    }
}


//事件监听
uname.addEventListener('keypress', setName);
uname.addEventListener('blur', setName);
plan.addEventListener('keypress', Plan);
plan.addEventListener('blur', Plan);

showtime();
setBgGreet();
getName();
getPlan();






