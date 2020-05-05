const contain = document.querySelector('#contain');
const circlesArr = [];
let rows = 15;
let cols = 15;
for (let i = 0; i < cols; i++) {
    circlesArr[i] = [];
    for (let j = 0; j < rows; j++) {
        const circle = document.createElement('div');
        circle.classList.add('circle');
        contain.appendChild(circle);
        circlesArr[i].push(circle);
    }
}
console.log(circlesArr);

circlesArr.forEach((cols, i) => {
    cols.forEach((circle, j) => {
        circle.onclick = () => {
            growCircle(i, j);
        }
    })
})
function growCircle(i, j) {
    if (circlesArr[i] && circlesArr[i][j]) {
        if (!circlesArr[i][j].classList.contains('grow')) {
            circlesArr[i][j].classList.add('grow');
            setTimeout(() => {
                growCircle(i - 1, j);
                growCircle(i, j - 1);
                growCircle(i + 1, j);
                growCircle(i, j + 1);
            }, 100);
            setTimeout(() => {
                circlesArr[i][j].classList.remove('grow');
            }, 300);
        }
    }

};
