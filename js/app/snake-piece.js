define(['./figure'], (Figure) => {
    class SnakePiece extends Figure {
        constructor(size, position) {
            super(size, position);
        }
    }

    return SnakePiece;
});