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
        var array = [];
        var self = this;
        var interval = null;
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
                console.log(array[this.score]);
                // console.log(array[this.score].classList);
                array[this.score].classList.remove('snake');
                array.splice(this.score, 1);
            }

        };

        this.showSnake = function () {
            this.board[this.index(this.snake.x, this.snake.y)].classList.add('snake');
            array.push(this.board[this.index(this.snake.x, this.snake.y)]);
            console.log(array);
            self.hideVisibleSnake();
            console.log(array);
        };
        this.showCoin = function () {
            this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
        };
        this.startGame = function () {
            interval = setInterval(function () {
                self.counter++;
                self.moveSnake();
            }, 1000)
        };
        this.moveSnake = function () {
            this.gameOver();
            if (this.snake.direction === "right") {
                this.snake.x = this.snake.x + 1;
            } else if (this.snake.direction === "left") {
                this.snake.x = this.snake.x - 1;
            } else if (this.snake.direction === "top") {
                this.snake.y = this.snake.y - 1;
            } else if (this.snake.direction === "bottom") {
                this.snake.y = this.snake.y + 1;
            }
            ;
            this.gameOver();
            this.showSnake();
            this.checkCoinCollision();

        };


        document.addEventListener('keydown', function (event) {
            self.turnSnake(event);
        });

        this.turnSnake = function (event) {

            switch (event.which) {
                case 37:
                    this.snake.direction = 'left';
                    break;
                case 39:
                    this.snake.direction = 'right';
                    break;
                case 38:
                    this.snake.direction = 'top';
                    break;
                case 40:
                    this.snake.direction = 'bottom';
                    break;
            }

        };
        this.checkCoinCollision = function () {
            if (this.snake.x === this.coin.x && this.snake.y === this.coin.y) {
                document.querySelector('.coin').classList.remove('coin');
                this.score++;
                document.querySelector('#score > div > strong').innerText = this.score;
                this.coin = new Coin();
                this.showCoin();
            } else return;
        };


        this.gameOver = function () {
            if (this.snake.x < 0 || this.snake.x > 9 || this.snake.y < 0 || this.snake.y > 9) {
                clearInterval(interval);
                // this.clearSnake();
                // document.querySelectorAll('.snake').classList.remove('snake');
                document.querySelector('.coin').classList.remove('coin');
                document.querySelector('#over').classList.remove('invisible');
                document.querySelector('#over-score').textContent = self.score;
                document.querySelector('#score > div > strong').innerText = 0;
            } else return;
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
