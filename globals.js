var vector,
    charStyle = document.getElementById('char01').style,
    charHorSpeed = .5,
    charVerSpeed = 1,
    action1 = false,
    action2 = false,
    walls = [],
    charHeight = 6,
    charWidth = 3,
    gapBorderTolerance = 2,
    movements,
    interactions,
    animations,
    level,
    wallsAmount
    gameOn = true;
