document.addEventListener("DOMContentLoaded", function () {
    var Furry = function () {
        this.x = 0;
        this.y = 0;
        this.direction = 'right';
    };


    var Coin = function () {
        this.x = Math.floor(Math.random() * 10);
        this.y = Math.floor(Math.random() * 10);
    };

    var Game = function () {
        var self = this;
        var interval = null;
        this.board = document.querySelectorAll("#board div");
        this.furry = new Furry();
        this.coin = new Coin();
        this.score = 0;
        this.index = function (x, y) {
            return x + (y * 10);
        };
        this.showFurry = function () {
            self.hideVisibleFurry();
            this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry');
        };
        this.showCoin = function () {
            this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
        };
        this.startGame = function () {
            interval = setInterval(function () {
                self.moveFurry();
            }, 250)
        };
        this.moveFurry = function () {
            self.gameOver();
            if (this.furry.direction === "right") {
                this.furry.x = this.furry.x + 1;
            } else if (this.furry.direction === "left") {
                this.furry.x = this.furry.x - 1;
            } else if (this.furry.direction === "top") {
                this.furry.y = this.furry.y - 1;
            } else if (this.furry.direction === "bottom") {
                this.furry.y = this.furry.y + 1;
            }
            ;
            self.gameOver();
            self.showFurry();
            self.checkCoinCollision();

        };
        this.hideVisibleFurry = function () {
            if (document.querySelector('.furry') === null) {
                return
            } else {
                document.querySelector('.furry').classList.remove('furry');
            }

        };
        document.addEventListener('keydown', function (event) {
            self.turnFurry(event);
        });

        this.turnFurry = function (event) {

            switch (event.which) {
                case 37:
                    this.furry.direction = 'left';
                    break;
                case 39:
                    this.furry.direction = 'right';
                    break;
                case 38:
                    this.furry.direction = 'top';
                    break;
                case 40:
                    this.furry.direction = 'bottom';
                    break;
            }

        };
        this.checkCoinCollision = function () {
            if (this.furry.x === this.coin.x && this.furry.y === this.coin.y) {
                document.querySelector('.coin').classList.remove('coin');
                this.score++;
                document.querySelector('#score > div > strong').innerText = this.score;
                this.coin = new Coin();
                game.showCoin();
            } else return;
        };
        this.gameOver = function () {
            if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
                clearInterval(interval);
                self.hideVisibleFurry()
                document.querySelector('#over').classList.remove('invisible');
                document.querySelector('#over').textContent = game.score;
            } else return;

        }


    };


    var game = new Game();

    // game.startGame();
    document.querySelector('#start').addEventListener('click', function () {
        document.querySelector('#start').classList.add('invisible');
        game.startGame();
        game.showFurry();
        game.showCoin();
    });
    document.querySelector('#over').addEventListener('click', function () {
        document.querySelector('#over').classList.add('invisible');
        game.hideVisibleFurry()
        game.showFurry();
        game.showCoin();
        game.startGame();

    });
});
