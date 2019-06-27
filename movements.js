function Movements() {

    this.handleMovement = handleMovement;
    this.charReachedExit = charReachedExit;
    this.charReachedWall = charReachedWall;

    return this;

    function charReachedWall() {
        var charTop = getCoord(charStyle.top);
        var charLeft = getCoord(charStyle.left);
        var charWidth = getCoord(charStyle.width);
        for (var i = 0; i < walls.length; i++) {
            var wallHeight = getCoord(walls[0].style.height);
            var wallTop = getCoord(walls[0].style.top);
            var wallLeft = getCoord(walls[0].style.left);
            var wallWidth = getCoord(walls[0].style.width);
            if (wallTop == 0) {
                if (
                    (wallTop + wallHeight > charTop)
                    && (charLeft + charWidth > wallLeft)
                    && (wallLeft + wallWidth > charLeft)
                ) {
                    return true;
                }
                return false;
            }
            if (
                (wallTop < charTop + charHeight)
                && (charLeft + charWidth > wallLeft)
                && (wallLeft + wallWidth > charLeft)
            ) return true;

        }
        return false;
    }

    function handleMovement() {
        var oldTop, oldLeft;
        if (vector > 0 && vector % 2 == 0) {
            oldTOp = getCoord(charStyle.top);
            charStyle.top = setNewCoord(getCoord(charStyle.top)) + '%';
        }
        if (vector > 0 && vector % 2 != 0) {
            oldLeft = getCoord(charStyle.left);
            charStyle.left = setNewCoord(getCoord(charStyle.left)) + '%';
        }
        if (movements.charReachedWall()) {
            charStyle.top = oldTop + '%';
            charStyle.left = oldLeft + '%';
        }
    }
    
    function setNewCoord(charCoord) {
        if (vector == 40) {
            maxTop = 100 - getCoord(charStyle.height);
            charCoord += charVerSpeed; 
            if (charCoord > maxTop) return maxTop;
            return charCoord;
        }
        if (vector == 37) {
            charCoord -= charHorSpeed;
            if (charCoord < 0) return 0;
            return charCoord;
        }
        if (vector == 38) {
            charCoord -= charVerSpeed;
            if (charCoord < 0) return 0;
            return charCoord;
        }
        if (vector == 39) {
            maxLeft = 100 - getCoord(charStyle.width);
            charCoord += charHorSpeed;
            if (charCoord > maxLeft) return maxLeft;
            return charCoord;
        }
    }
    
    function getCoord(coord) {
        var regex = /[+-]?\d+(\.\d+)?/g;
        if (coord == '') return 0;
        return parseFloat(coord.match(regex).map(function(v) { return parseFloat(v); }));
    }
    
    function charReachedExit() {
        var exit = getCoord(document.getElementById('exit').style.left),
            charLeft = getCoord(charStyle.left);
        return getCoord(charStyle.top) == 0 && charLeft >= exit && charLeft + charHeight <= exit + charHeight + gapBorderTolerance;
    }
    
}
