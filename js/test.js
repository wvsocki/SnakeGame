document.addEventListener("DOMContentLoaded", function () {

    //Konstuktory
    var Furry = function () {
        this.x = 0;
        this.y = 0;
        this.direction = "bottom";

    };

    var Coin = function () {
        this.x = Math.floor(Math.random() * 10);
        this.y = Math.floor(Math.random() * 10);
    };
    // Gra
    var Game = function () {
        var self = this;
        this.board = document.querySelectorAll("#board div");
        this.furry = new Furry();
        this.coin = new Coin();
        this.score = 0;
        this.index = function (x, y) {
            return x + (y * 10);
        };
        //Pokazanie furry
        this.showFurry = function () {
            this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry');
            self.hideVisibleFurry();
        };

    };
    this.showCoin = function () {
        this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
    };
    this.moveFurry = function () {
        if (this.furry.direction === "right") {
            this.furry.x = this.furry.x + 1;
        } else if (this.furry.direction === "left") {
            this.furry.x = this.furry.x - 1;
        } else if (this.furry.direction === "top") {
            this.furry.y = this.furry.y + 1;
        } else if (this.furry.direction === "bottom") {
            this.furry.y = this.furry.y - 1;
        }
        self.showFurry();
        self.checkCoinCollision();
        // self.gameOver();
    };
    this.turnFurry = function (event) {
        switch (event.which){
            case 37:
                this.furry.direction = 'left';
                break;
            case 38:
                this.furry.direction = 'right';
                break;
            case 39:
                this.furry.direction = 'up';
                break;
            case 40:
                this.furry.direction = 'down';
                break;
        }
    };
    this.hideVisibleFurry = function () {
        console.log(document.querySelector('.furry'));
        var removeFurry = document.querySelector('.furry');
        if (removeFurry === null) {
            return
        } else
            removeFurry.classList.remove('furry');
        console.log(removeFurry);
        document.addEventListener('keydown',function (event) {
            Game.turnFurry(event);
        });
        this.checkCoinCollision = function () {
            if (this.furry.x === this.coin.x && this.furry.y === this.coin.y) {
                this.score = this.score +1;
                coin.classList.remove('coin');
                this.newCoin = new Coin();
                this.coin = newCoin;
                self.coin.showCoin();
            } else {
                return
            };
        };
        this.gameOver = function () {
            if(( this.furry.x < 0 || this.furry.x > 9)&& (this.furry.y < 0 || this.furry.y > 9)){
                self.clearInterval(this.startGame());
                self.hideVisibleFurry()
            } else{
                return
            }
        };
        this.startGame = function () {
            setInterval(function () {
                self.moveFurry();
            }, 250)
        };

    };

    var game = new Game();
    game.showFurry();
    game.showCoin();
    game.startGame();
});