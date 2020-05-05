const choice = document.querySelectorAll('.choice');
const restart = document.getElementById('restart');
const modal = document.querySelector('.modal');
const result = document.getElementById('result');
const score = document.getElementById('score');
const scoreboard = {
    play: 0,
    computer: 0
};

//playgame
function play(e) {
    restart.style.display = 'inline-block';  //设置重新开始显示
    const playChoice = e.target.id;  //获取玩家选择的id
    //电脑选择
    const computerChoice = getComputerChoice();
    console.log(playChoice, computerChoice);

    //决定胜负
    const winner = getWinner(playChoice, computerChoice);
    showWinner(winner, computerChoice);

}

function getComputerChoice() {
    const rand = Math.random();
    if (rand < 0.33) {
        return 'rock';
    } else if (rand <= 0.67) {
        return 'paper';
    } else {
        return 'scissors';
    }
}

function getWinner(p, c) {
    if (p == c) {
        return 'draw';
    } else if (p === 'rock') {
        if (c == 'paper') {
            return 'computer';
        } else {
            return 'player';
        }
    } else if (p === 'paper') {
        if (c == 'scissors') {
            return 'computer';
        } else {
            return 'player';
        }
    } else if (p === 'scissors') {
        if (c == 'rock') {
            return 'computer';
        } else {
            return 'player';
        }
    }

}

//显示获胜者
function showWinner(winner, computerChoice) {
    if (winner === 'player') {
        scoreboard.play++;
        result.innerHTML = `
        <h1 class="text-win">恭喜你，你赢了</h1>
        <p>电脑的选择为</p>
        <i class="fas fa-hand-${computerChoice} fa-10x"></i>`;
    } else if (winner === 'computer') {
        scoreboard.computer++;
        result.innerHTML = `
        <h1 class="text-lose">抱歉，你输了</h1>
        <p>电脑的选择为</p>
        <i class="fas fa-hand-${computerChoice} fa-10x"></i>`;
    } else {
        result.innerHTML = `
        <h1>双方平局</h1>
        <p>电脑的选择为</p>
        <i class="fas fa-hand-${computerChoice} fa-10x"></i>`;
    }
    score.innerHTML = `
            <p>玩家：${scoreboard.play}</p>
            <p>电脑：${scoreboard.computer}</p>`;  //显示分数
    modal.style.display = 'block';
}

function clearModal(e) {
    if (e.target == modal) {
        modal.style.display = 'none';
    }

}

function restartGame() {
    scoreboard.play = 0;
    scoreboard.computer = 0;
    score.innerHTML = `
            <p>玩家：0</p>
            <p>电脑：0</p>`;
}

restart.addEventListener('click', restartGame);
choice.forEach(choice => choice.addEventListener('click', play));
window.addEventListener('click', clearModal);









