define(() => {
    class Renderer {
        constructor(context) {
            this._context = context;
        }

        render(snake, food) {
            this._context.clearRect(0, 0, this._context.canvas.width, this._context.canvas.height);
            this._renderSnake(snake);
            this._renderFood(food);
        }

        _renderSnake(snake) {
            for (let i = 0; i < snake.pieces.length; i++) {
                let size = snake.pieces[i].size;
                let x = snake.pieces[i].position.x;
                let y = snake.pieces[i].position.y;

                if (i === 0) {
                    this._context.fillStyle = "black";
                } else {
                    this._context.fillStyle = "#4D4D4D";
                }

                this._context.fillRect(x, y, size, size);
                this._context.strokeStyle = "white";
                this._context.strokeRect(x, y, size, size);
            }
        }

        _renderFood(food) {
            console.log(food);
            this._context.beginPath();
            this._context.fillStyle = "red";
            this._context.arc(food.position.x, food.position.y, food.size, 0, 2 * Math.PI, false);
            this._context.stroke();
            this._context.fill();
        }

        _renderGrid() {
            function renderLineX(x) {
                this._context.beginPath();
                this._context.strokeStyle = "green";
                this._context.moveTo(x, 0);
                this._context.lineTo(x, this._context.canvas.height);
                this._context.stroke();
            }

            function renderLineY(y) {
                this._context.beginPath();
                this._context.moveTo(0, y);
                this._context.lineTo(this._context.canvas.width, y);
                this._context.stroke();
            }

            for (let i = 0; i <= this._context.canvas.width; i += snake.PIECE_SIZE) {
                renderLineX(i);
            }

            for (let i = 0; i <= this._context.canvas.height; i += snake.PIECE_SIZE) {
                renderLineY(i);
            }
        }
    }

    return Renderer;
});