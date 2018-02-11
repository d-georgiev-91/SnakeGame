define(['./renderer', './direction', './snake', './food'], (Renderer, Direction, Snake, Food) => {
    const SNAKE_SIZE = 5;
    const SNAKE_PIECE_SIZE = 10;
    const FOOD_SIZE = 5;

    class Engine {
        constructor(gameField) {
            this._gameField  = gameField;
            this._snake = this._generateSnake();
            this._food = this._generateFood();
            this._renderer = new Renderer(this._gameField, this._snake, this._food);
            this._turnedCurrentFrame = false;
            this._setupControls();

            this._fps = 12;
            this._lastRendered = Date.now();
            this._renderInterval = 1000 / this._fps;
        }

        onGameOver() {}

        reset() {
            this._snake = this._generateSnake();
            this._food = this._generateFood();
            this._turnedCurrentFrame = false;
        }

        run() {
            if (this._isGameOver()) {
                this.onGameOver();
                return;
            }

            this._turnedCurrentFrame = false;
            requestAnimationFrame(this.run.bind(this));

            let now = Date.now();
            let delta =  now - this._lastRendered;

            if (delta > this._renderInterval) {
                this._lastRendered = now - (delta % this._renderInterval);
                this._renderer.render(this._snake, this._food);

                this._snake.move();

                if (this._snake.hadEatenTheFood(this._food)) {
                    this._snake.grow();
                    this._food = this._generateFood();
                }
            }
        }

        _setupControls() {
            document.addEventListener("keydown", this._onKeyDownChangeDirection.bind(this), false);
        }

        _onKeyDownChangeDirection(evt) {
            if (!this._turnedCurrentFrame) {
                switch (evt.keyCode) {
                    case 37:
                        this._snake.changeDirection(Direction.LEFT);
                        break;
                    case 38:
                        this._snake.changeDirection(Direction.UP);
                        break;
                    case 39:
                        this._snake.changeDirection(Direction.RIGHT);
                        break;
                    case 40:
                        this._snake.changeDirection(Direction.DOWN);
                        break;
                }
                this._turnedCurrentFrame = true;
            }
        }

        _isFoodOnSnake(snake, food) {
            for (let i = 0; i < snake.pieces.length; i++) {
                let snakePiece = snake.pieces[i];

                if (snakePiece.position.x === food.position.x &&
                    snakePiece.position.y === food.position.y) {

                    return true;
                }
            }

            return false;
        }

        _generateSnake() {
            let position;

            do {
                position = this._getRandomPosition(SNAKE_PIECE_SIZE);
            } while (position.x - SNAKE_SIZE * SNAKE_PIECE_SIZE < 0 ||
                    this._gameField.canvas.width <= position.x + 2 * SNAKE_PIECE_SIZE);

            let snake = new Snake(SNAKE_SIZE, position);
            return snake;
        }

        _generateFood() {
            let position = this._getRandomPosition(FOOD_SIZE);
            let food = new Food(FOOD_SIZE, position);
            return food;
        }

        _getRandomPosition(objectSize) {
            let position = {
                x: parseInt(this._getRandomNumber(objectSize, this._gameField.canvas.width) / SNAKE_PIECE_SIZE, 10) *
                    SNAKE_PIECE_SIZE + objectSize,
                y: parseInt(this._getRandomNumber(objectSize, this._gameField.canvas.height) / SNAKE_PIECE_SIZE, 10) *
                    SNAKE_PIECE_SIZE + objectSize,
            };

            return position;
        }

        _getRandomNumber(min, max) {
            return (Math.random() * (max - min) + min) | 0;
        }

        _isGameOver() {
            if (this._snake.isSelfEaten()) {
                return true;
            }

            if (this._snake.head.position.x < 0 ||
                    this._gameField.canvas.width <= this._snake.head.position.x ||
                    this._snake.head.position.y < 0 ||
                    this._gameField.canvas.height <= this._snake.head.position.y) {
                window.removeEventListener("keydown", this._onKeyDownChangeDirection, false);

                return true;
            }

            return false;
        }
    }

    return Engine;
});