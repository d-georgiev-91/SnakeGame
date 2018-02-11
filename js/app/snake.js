define(['./figure', './snake-piece', './direction'], (Figure, SnakePiece, Direction) => {
    const PIECE_SIZE = 10;

    class Snake extends Figure {
        constructor(size, position) {
            super(size, position);

            this.pieces = [];
            this.direction = Direction.RIGHT;

            for (let i = 0; i < size; i++) {

                let currentPosition = {
                    x: position.x - i * this.PIECE_SIZE,
                    y: position.y
                };

                this.pieces.push(new SnakePiece(this.PIECE_SIZE, currentPosition));
            }

            this.head = this.pieces[0];
        }

        get PIECE_SIZE() {
            return PIECE_SIZE;
        }

        move() {
            for (let i = this.pieces.length - 1; i > 0; i--) {
                this.pieces[i].position = this.pieces[i - 1].position;
            }

            let nextHeadPosition;

            switch (this.direction) {
                case Direction.LEFT:
                    nextHeadPosition = {
                        x: this.head.position.x - this.PIECE_SIZE,
                        y: this.head.position.y
                    };
                    break;
                case Direction.RIGHT:
                    nextHeadPosition = {
                        x: this.head.position.x + this.PIECE_SIZE,
                        y: this.head.position.y
                    };
                    break;
                case Direction.DOWN:
                    nextHeadPosition = {
                        x: this.head.position.x,
                        y: this.head.position.y + this.PIECE_SIZE,
                    };
                    break;
                case Direction.UP:
                    nextHeadPosition = {
                        x: this.head.position.x,
                        y: this.head.position.y - this.PIECE_SIZE
                    };
                    break;
            }

            this.head.position = nextHeadPosition;
        }

        changeDirection(direction) {
            let isLeftValid = this.direction === Direction.LEFT && direction !== Direction.RIGHT;
            let isRightValid = this.direction === Direction.RIGHT && direction !== Direction.LEFT;
            let isDownValid = this.direction === Direction.DOWN && direction !== Direction.UP;
            let isUpValid = this.direction === Direction.UP && direction !== Direction.DOWN;
            let isValidDirection = isLeftValid || isRightValid || isDownValid || isUpValid;

            if (isValidDirection) {
                this.direction = direction;
            }
        }

        grow() {
            let tail = this.pieces[this.pieces.length - 1];
            this.move();

            let newPiecePosition = {
                x: tail.position.x,
                y: tail.position.y
            };

            this.pieces.push(new SnakePiece(this.PIECE_SIZE, newPiecePosition));
        }

        isSelfEaten() {
            for (let i = 1, len = this.pieces.length; i < len - 1; i++) {
                if (this.head.position.x === this.pieces[i].position.x &&
                    this.head.position.y === this.pieces[i].position.y) {
                    return true;
                }
            }

            return false;
        }

        hadEatenTheFood(food) {
            return this.head.position.x === food.position.x - 5 &&
                this.head.position.y === food.position.y - 5;
        }
    }

    return Snake;
});