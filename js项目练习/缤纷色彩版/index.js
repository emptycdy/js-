window.addEventListener('load', function () {

    const container = document.getElementById('container');
    const colors = ['#e74c3c', '#8e44ad', '#3498db', '#e67e22', '#2ecc71'];
    const squareTital = 500;

    for (let i = 0; i < squareTital; i++) {
        const square = document.createElement('div');
        square.classList.add('square');

        square.addEventListener('mouseover', () => {
            setColorToEl(square);
        })
        square.addEventListener('mouseout', () => {
            removeColorFromEl(square);
        })

        container.appendChild(square);
    }

    function setColorToEl(el) {
        const color=getRandomColor();
        el.style.background=color;
        el.style.boxShadow=`0 0 2px ${color},0 0 10px ${color}`;
    }

    function removeColorFromEl(el) {
        el.style.background='#1d1d1d';
        el.style.boxShadow=`0 0 2px #000`;
    }

    function getRandomColor() {
        return colors[Math.floor(Math.random()*colors.length)];
    }













})