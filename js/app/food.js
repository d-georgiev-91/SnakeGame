define(['./figure'], (Figure) => {
    class Food extends Figure {
        constructor(size, position) {
            super(size, position);
        }
    }

    return Food;
});