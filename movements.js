function Movements() {

    this.handleMovement = handleMovement;
    this.charReachedExit = charReachedExit;
    this.charReachedWall = charReachedWall;
    this.getCoord = getCoord;

    return this;

    function charReachedWall() {
        let charTop = getCoord(charStyle.top);
        let charLeft = getCoord(charStyle.left);
        for (let i = 0; i < walls.length; i++) {
            let wallHeight = getCoord(walls[i].style.height);
            let wallTop = getCoord(walls[i].style.top);
            let wallLeft = getCoord(walls[i].style.left);
            let wallWidth = getCoord(walls[i].style.width);
            if (wallTop == 0) {
                if (
                    (wallTop + wallHeight > charTop)
                    && (charLeft + charWidth > wallLeft)
                    && (wallLeft + wallWidth > charLeft)
                ) {
                    return true;
                }
            } else {
                if (
                    (wallTop < charTop + charHeight)
                    && (charLeft + charWidth > wallLeft)
                    && (wallLeft + wallWidth > charLeft)
                ) {
                    return true;
                }
            }
        }
        return false;
    }

    function handleMovement() {
        let oldTop, oldLeft;
        if (vector > 0 && vector % 2 == 0) {
            oldTop = getCoord(charStyle.top);
            charStyle.top = setNewCoord(oldTop) + '%';
        }
        if (vector > 0 && vector % 2 != 0) {
            oldLeft = getCoord(charStyle.left);
            charStyle.left = setNewCoord(oldLeft) + '%';
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
