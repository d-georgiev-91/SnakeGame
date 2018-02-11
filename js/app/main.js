define(['./engine', './menu'],(Engine, Menu) => {
    let canvas = document.getElementById("game-canvas"),
        context = canvas.getContext('2d'),
        engine = new Engine(context),
        menu = new Menu('#wrapper', [
        {
            key: 'start-game',
            text: 'Start game',
            action: () => {
                menu.hide();
                engine.run();
            }
        }
    ]);

    engine.onGameOver = () => {
        engine.reset();
        menu.show();
    };

    menu.show();
});