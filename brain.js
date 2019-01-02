
var vector,
    charStyle = document.getElementById('char01').style,
    charHorSpeed = 1,
    charVerSpeed = 1,
    action1 = false,
    action2 = false,
    charSize = 6,
    gapBorderTolerance = 2;

document.addEventListener('keydown', function(e) {
    var key = e.which;
    if (key == 37 || key == 38  || key == 39  || key == 40) vector = key;
    if (key == 32) action1 = true;
    if (key == 17) action2 = true;
});

document.addEventListener('keyup', function(e) {
    var key = e.which;
    if (key == 37 || key == 38  || key == 39  || key == 40) vector = 0;
});

function gameLoop() {
    handleMovement(getCoord(charStyle.left), getCoord(charStyle.top));
    checkCharTouching();
    handleAction();
    setTimeout(gameLoop, 15);
}

function getCoord(coord) {
    var regex = /[+-]?\d+(\.\d+)?/g;
    if (coord == '') return 0;
    return parseFloat(coord.match(regex).map(function(v) { return parseFloat(v); }));
}

function handleMovement(charLeft, charTop) {
    if (vector > 0 && vector % 2 == 0) {
        charStyle.top = setNewCoord(charTop) + '%';
    }
    if (vector > 0 && vector % 2 != 0) {
        charStyle.left = setNewCoord(charLeft) + '%';

    }
}

function setNewCoord(charCoord) {
    if (vector == 40) {
        maxTop = 100 - getCoord(charStyle.height);
        charCoord += charVerSpeed; 
        if (charCoord > maxTop) charCoord = maxTop;
    }
    if (vector == 37) {
        charCoord -= charHorSpeed;
        if (charCoord < 0) charCoord = 0;
    }
    if (vector == 38) {
        charCoord -= charVerSpeed;
        if (charCoord < 0) charCoord = 0;
    }
    if (vector == 39) {
        maxLeft = 100 - getCoord(charStyle.width);
        charCoord += charHorSpeed;
        if (charCoord > maxLeft) charCoord = maxLeft;
    }
    return charCoord;
}

function handleAction() {
    if (action1) {
        blinkBackground(charStyle, 8, '#FFF', '#000');
        action1 = false;
    }
    if (action2) {
        blinkBackground(charStyle, 1, '#FFF', '#000');
        action2 = false;
    }
}

function charReachedExit() {
    var exit = getCoord(document.getElementById('exit').style.left),
        charLeft = getCoord(charStyle.left);
    return getCoord(charStyle.top) == 0 && charLeft >= exit && charLeft + charSize <= exit + charSize + gapBorderTolerance;
}


function loadGame() {
    Level(2, charSize, gapBorderTolerance);
}

function destroyElements() {
    var els = getElementsByClass('destroy'),
        i;
    for (i = 0; i < els.length; i++) {
        els[i].parentNode.removeChild(els[i]);
    }
}

function getElementsByClass(className) {
    return document.getElementsByClassName(className);
}

function checkCharTouching() {
    if (charReachedExit()) {
        destroyElements();
        loadGame();
        return;
    }
}

loadGame();
gameLoop();
