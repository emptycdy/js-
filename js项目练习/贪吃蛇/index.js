window.onload = function () {

    var sw = 20,  //方块宽
        sh = 20,  //方块高
        tr = 30,  //行
        td = 30;   //列
    var snake = null, //蛇实例
        food = null,  //食物实例
        game = null;  //游戏实例

    function Square(x, y, classname) {
        this.x = x * sw;
        this.y = y * sh;
        this.class = classname;
        this.viewContent = document.createElement('div');  //方块对应于dom元素
        this.viewContent.className = this.class;
        this.parent = document.getElementById('snakeWrap');  //方块父级
    }
    //创建方块dom
    Square.prototype.create = function () {
        this.viewContent.style.position = 'absolute';
        this.viewContent.style.width = sw + 'px';
        this.viewContent.style.height = sh + 'px';
        this.viewContent.style.left = this.x + 'px';
        this.viewContent.style.top = this.y + 'px';
        this.parent.appendChild(this.viewContent);
    }
    //删除方块
    Square.prototype.remove = function () {
        this.parent.removeChild(this.viewContent);
    }
    //蛇
    function Snake() {
        this.head = null;  //存蛇头信息
        this.tail = null;  //存蛇尾信息
        this.pos = [];     //存蛇身上每个方块位置
        this.directionNum = {  //存蛇走的方向
            left: {
                x: -1,
                y: 0,
                rotate: 180  //蛇头在不同方向中进行旋转
            },
            right: {
                x: 1,
                y: 0,
                rotate: 0
            },
            up: {
                x: 0,
                y: -1,
                rotate: -90
            },
            down: {
                x: 0,
                y: 1,
                rotate: 90
            }
        }
    }

    //初始化
    Snake.prototype.init = function () {
        //创建蛇头
        var snakeHead = new Square(2, 0, 'snakeHead');
        snakeHead.create();
        this.head = snakeHead;  //存储蛇头信息
        this.pos.push([2, 0]);  //蛇头位置存起来

        //创建蛇身体1
        var snakeBody1 = new Square(1, 0, 'snakeBody');
        snakeBody1.create();
        this.pos.push([1, 0]);  //蛇身体1的坐标存储

        //创建蛇身体122
        var snakeBody2 = new Square(0, 0, 'snakeBody');
        snakeBody2.create();
        this.tail = snakeBody2;  //存储蛇尾信息
        this.pos.push([0, 0]);  //蛇身体2的坐标存储

        //链表关系
        snakeHead.last = null;
        snakeHead.next = snakeBody1;
        snakeBody1.last = snakeHead;
        snakeBody1.next = snakeBody2;
        snakeBody2.last = snakeBody1;
        snakeBody2.next = null;

        //添加一个默认方向
        this.direction = this.directionNum.right;  //默认向右
    }

    //获取蛇头的下个位置对应的元素，要根据元素做不同的事情
    Snake.prototype.getNextPos = function () {
        var nextPos = [  //蛇头要走的下一个点坐标
            this.head.x / sw + this.direction.x,
            this.head.y / sh + this.direction.y
        ]

        //下个点是自己，代表撞自己，游戏结束
        var selfCollied = false;  //是都撞到自己
        this.pos.forEach(function (value) {
            if (value[0] == nextPos[0] && value[1] == nextPos[1]) {
                selfCollied = true;  //如果数组中值两个都相等代表撞到了
            }
        })
        if (selfCollied) {
            this.strategies.die.call(this);
            return;
        }

        //下个点是墙，撞到围墙，游戏结束
        if (nextPos[0] < 0 || nextPos[1] < 0 || nextPos[0] > td - 1 || nextPos[1] > tr - 1) {
            this.strategies.die.call(this);
            return;
        }

        //下个点是食物，吃掉长身体
        if(food&&food.pos[0]==nextPos[0]&&food.pos[1]==nextPos[1]){
            this.strategies.eat.call(this);
            console.log('吃掉了');
            return;
        }

        //下个点没东西，继续走
        this.strategies.move.call(this);
    }

    //处理撞到后的事
    Snake.prototype.strategies = {
        //走
        move: function (format) {  //format决定要不要删除尾巴  传了参数就是吃  不传就是走
            var newBody = new Square(this.head.x / sw, this.head.y / sh, 'snakeBody') //创建新的身体(在旧蛇头的位置)
            //更新链表关系
            newBody.next = this.head.next;
            newBody.next.last = newBody;
            newBody.last = null;

            this.head.remove();  //删除旧蛇头
            newBody.create();

            var newHead = new Square(this.head.x / sw + this.direction.x, this.head.y / sh + this.direction.y, 'snakeHead') //创建新蛇头
            newHead.next = newBody;
            newHead.last = null;
            newBody.last = newHead;
            newHead.viewContent.style.transform = 'rotate(' + this.direction.rotate + 'deg)'
            newHead.create();

            //更新蛇身上的位置
            this.pos.splice(0, 0, [this.head.x / sw + this.direction.x, this.head.y / sh + this.direction.y]);
            this.head = newHead;  //更新蛇头信息

            if (!format) {  //如果format为false表示需要删除
                this.tail.remove();
                this.tail = this.tail.last;
                this.pos.pop();
            }
        },
        //吃
        eat: function () {
            this.strategies.move.call(this, true);
            createFood();
            game.score++;
        },
        //游戏结束
        die: function () {
            game.over();
        }
    }



    snake = new Snake();


    //创建食物
    function createFood() {
        //食物的随机坐标
        var x = null;
        var y = null;

        var include = true;  //循环跳出的条件，true表示生成食物的坐标在蛇身上(继续循环)，false表示不在身上(不循环)
        while (include) {
            x = Math.round(Math.random() * (td - 1));
            y = Math.round(Math.random() * (tr - 1));
            snake.pos.forEach(function (value) {
                if (x != value[0] && y != value[1]) {
                    //这个条件表示不再蛇身上
                    include = false;
                }
            });
        }
        //生成食物
        food = new Square(x, y, 'food');
        food.pos=[x,y] //存储生成食物坐标，做对比
        var foodDom=document.querySelector('.food');
        if(foodDom){
            foodDom.style.left=x*sw+'px';
            foodDom.style.top=y*sh+'px';
        }else{
            food.create();
        }

    }

    //创建游戏逻辑
    function Game() {
        this.timer = null;
        this.score = 0;
    }
    Game.prototype.init = function () {
        snake.init();
        // snake.getNextPos();
        createFood();
        document.onkeydown = function (e) {
            if (e.which == 37 && snake.direction != snake.directionNum.right) {  //用户按左键时候
                snake.direction = snake.directionNum.left;
            } else if (e.which == 38 && snake.direction != snake.directionNum.down) {
                snake.direction = snake.directionNum.up;
            } else if (e.which == 39 && snake.direction != snake.directionNum.left) {
                snake.direction = snake.directionNum.right;
            } else if (e.which == 40 && snake.direction != snake.directionNum.up) {
                snake.direction = snake.directionNum.down;
            }
        }
        this.start();
    }
    Game.prototype.start = function () {
        this.timer = setInterval(function () {
            snake.getNextPos();
        }, 200)
    }
    Game.prototype.pause=function(){
        clearInterval(this.timer);
    }
    Game.prototype.over=function(){
        clearInterval(this.timer);
        alert('你的得分为'+this.score);

        //游戏回到最初状态
        var snakeWrap=document.querySelector('#snakeWrap');
        snakeWrap.innerHTML='';
        snake=new Snake();
        game=new Game();
        var startBtnWrap=document.querySelector('.startBtn');
        startBtnWrap.style.display='block';
    }

    //开始游戏

    game = new Game();

    var startBtn=document.querySelector('.startBtn button');
    startBtn.onclick = function () {
        startBtn.parentNode.style.display='none';
        game.init();
    }

    //暂停游戏
    var snakeWrap=document.querySelector('#snakeWrap');
    var pauseBtn=document.querySelector('.pauseBtn button');
    snakeWrap.onclick=function () {
        game.pause();
        pauseBtn.parentNode.style.display='block';
    }
    pauseBtn.onclick=function () {
        game.start();
        pauseBtn.parentNode.style.display='none';
    }




}