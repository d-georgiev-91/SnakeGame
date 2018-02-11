define(() => {
    class Figure {
        constructor(size, position) {
            this.size = size;
            this.position = position;
        }

        get size() {
            return this._size;
        }

        set size(value) {
            this._size = value;
        }

        get position() {
            return this._position;
        }

        set position(value) {
            this._position = value;
        }
    }

    return Figure;
});