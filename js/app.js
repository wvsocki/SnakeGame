document.addEventListener("DOMContentLoaded", function () {
    var Snake = function () {
        this.x = 0;
        this.y = 0;
        this.direction = 'right';
    };


    var Coin = function () {
        this.x = Math.floor(Math.random() * 10);
        this.y = Math.floor(Math.random() * 10);
    };

    var Game = function () {
        var snakeBody = [];
        var self = this;
        var interval;
        // var lastMoveDirection;
        this.speed = 500;
        this.board = document.querySelectorAll("#board div");
        this.snake = new Snake();
        this.coin = new Coin();
        this.score = 0;
        this.counter = 0;
        this.index = function (x, y) {
            return x + (y * 10);
        };

        this.hideVisibleSnake = function () {
            if(self.counter == 0){
                return
            } else {
                if (this.board[this.index(this.snake.x, this.snake.y)].classList.contains('coin')) {
                    return
                }
                snakeBody[0].classList.remove('snake');
                snakeBody.splice(0, 1);
            }

        };

        this.showSnake = function () {
            snakeBody.push(this.board[this.index(this.snake.x, this.snake.y)]);
            for (var i = 0; i< snakeBody.length; i++){
                snakeBody[i].classList.add('snake')
            }
            // console.log(array);
            self.hideVisibleSnake();
            // console.log(array);
        };
        this.showCoin = function () {
            this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
        };
        this.startGame = function () {
            interval = setInterval(function () {
                self.counter++;
                self.moveSnake();
            }, this.speed)
        };
        this.moveSnake = function () {
            if (this.snake.direction === "right") {
                this.snake.x = this.snake.x + 1;
                self.lastMoveDirection = 'right'
            } else if (this.snake.direction === "left") {
                this.snake.x = this.snake.x - 1;
                self.lastMoveDirection = 'left'
            } else if (this.snake.direction === "top") {
                this.snake.y = this.snake.y - 1;
                self.lastMoveDirection = 'top'
            } else if (this.snake.direction === "bottom") {
                this.snake.y = this.snake.y + 1;
                self.lastMoveDirection = 'bottom'
            };
            // this.checkWallColision();
            // this.checkTailColision();
            if (this.snake.x < 0 || this.snake.x > 9 || this.snake.y < 0 || this.snake.y > 9) {
                this.gameOver();
                return

            }

            if (this.board[this.index(this.snake.x, this.snake.y)].classList.contains('snake')){
                this.gameOver();
                return
            }

            this.showSnake();
            this.checkCoinCollision();
            this.currentLevel(self.score)

            // this.checkWallColision();

        };


        document.addEventListener('keydown', function (event) {
            self.turnSnake(event);
        });

        this.turnSnake = function (event) {

            switch (event.which) {
                case 37:
                    if (this.lastMoveDirection !== 'right' && this.snake.direction !== 'left'){
                        this.snake.direction = 'left';
                    } else return;
                    break;
                case 39:
                    if (this.lastMoveDirection !== 'left' && this.snake.direction !== 'right'){
                        this.snake.direction = 'right';
                    } else return;
                    break;
                case 38:
                    if (this.lastMoveDirection !== 'bottom' && this.snake.direction !== 'top'){
                        this.snake.direction = 'top';
                    } else return;
                    break;
                case 40:
                    if (this.lastMoveDirection !== 'top' && this.snake.direction !== 'bottom'){
                        this.snake.direction = 'bottom';
                    } else return;
                    break;
            }

        };
        this.createNewCoin = function () {
            this.coin = new Coin();
            if (this.board[this.index(this.coin.x, this.coin.y)].classList.contains('snake')){
                this.createNewCoin()
            } else {
                this.showCoin();
            }



        };
        this.checkCoinCollision = function () {
            if (this.snake.x === this.coin.x && this.snake.y === this.coin.y) {
                document.querySelector('.coin').classList.remove('coin');
                this.score++;
                document.querySelector('#score').innerText = this.score;
                this.createNewCoin()
            } else return;
        };
        this.currentLevel = function (score) {
            switch (score) {
                case 2:
                    this.speed = 300;
                    clearInterval(interval);
                    this.startGame();
                    document.querySelector('#level').innerText = "YEAH, STILL SLOW";

                    break;
                case 5:
                    this.speed = 200;
                    clearInterval(interval);
                    this.startGame();
                    document.querySelector('#level').innerText = "STILL EASY, RIGHT?";

                    break;
                case 8:
                    this.speed = 100;
                    clearInterval(interval);
                    this.startGame();

                    break;
                case 50:

                    break;
                case 60:

                    break;
                case 70:

                    break;

            }
        }


        // this.checkWallColision = function () {
        //     if (this.snake.x < 0 || this.snake.x > 9 || this.snake.y < 0 || this.snake.y > 9) {
        //         this.gameOver()
        //     } else return;
        // };
        // this.checkTailColision = function () {
        //     if (this.board[this.index(this.snake.x, this.snake.y)].classList.contains('snake')){
        //         this.gameOver()
        //     } else return
        // }
        this.gameOver = function () {
            clearInterval(interval);
            // console.log(document.querySelectorAll('.snake'));
            var snakesToDelete = document.querySelectorAll('.snake');
            for (var i = 0; i<snakesToDelete.length; i++){
                snakesToDelete[i].classList.remove('snake')};
            // console.log("po");
            // console.log(document.querySelectorAll('.snake'));
            document.querySelector('.coin').classList.remove('coin');
            document.querySelector('#over').classList.remove('invisible');
            document.querySelector('#over-score').textContent = self.score;
            document.querySelector('#score').innerText = 0;
        }
    };
    function StartNewGame() {
        var game = new Game();
        game.showSnake();
        game.showCoin();
        game.startGame();

    }
    document.querySelector('#start').addEventListener('click', function () {
        document.querySelector('#start').classList.add('invisible');
        StartNewGame();
    });
    document.querySelector('#over').addEventListener('click', function () {
        document.querySelector('#over').classList.add('invisible');
        StartNewGame();

    });
});

