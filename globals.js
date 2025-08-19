var vector,
  charStyle = document.getElementById('char01').style,
  charHorSpeed = .5, // movements.js
  charVerSpeed = 1, // movements.js
  action1 = false,
  action2 = false,
  walls = [],
  charHeight = 6,
  charWidth = 3,
  gapBorderTolerance = 2,
  wallsAmount,
  gameOn = true;
