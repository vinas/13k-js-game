
function setup() {
    Interactions();
    movements = Movements();
    animations = Animations();
    level = Level();
    wallsAmount = 1;
    charStyle.width = charWidth + '%';
    charStyle.height = charHeight + '%';
}

function loadGame(wallsAmount) {
    if (!wallsAmount) wallsAmount = 1;
    level.generate(wallsAmount);
    gameOn = true;
}

function gameLoop() {
    if (gameOn) {
        handleMovement();
        checkCharTouching();
        handleAction();
    }
    setTimeout(gameLoop, 15);
}

function checkCharTouching() {
    if (movements.charReachedExit()) {
        destroyElements();
        wallsAmount++;
        loadGame(wallsAmount);
        return;
    }
}

function handleAction() {
    if (action1) {
        animations.blinkBackground(charStyle, 8, '#FFF', 'transparent');
        action1 = false;
    }
    if (action2) {
        animations.blinkBackground(charStyle, 1, '#FFF', 'transparent');
        action2 = false;
    }
}

function destroyElements() {
    var els = document.getElementsByClassName('destroy');
    var limit = els.length;
    for (var i = 0; i < limit; i++) {
        els[0].parentNode.removeChild(els[0]);
    }
}

setup();
loadGame();
gameLoop();
