
function Level() {
    
    var wallsLengths = [];
    var entrance = [];
    var exit = [];
    var entranceElem = document.getElementById('entrance');
    var exitElem = document.getElementById('exit');
    var character = document.getElementById('char01');
    var passageGap = charHeight + gapBorderTolerance;

    this.generate = generate;

    return this;

    function generate() {
        wallsLengths = [];
        calcWallsLengths();
        setEntrance();
        setExit();
        setCharLocation();
        setWalls();
    }

    function calcWallsLengths() {
        for (var i = 0; i < wallsAmount; i++) {
            wallsLengths.push(parseFloat(calcMaxWallLenght(i+1)));
        }
    }

    function calcMaxWallLenght(generation) {
        var wallLenght = (100 / generation - passageGap).toFixed(2);
        return (wallLenght > passageGap) ? wallLenght : passageGap;
    }

    function getRandom(start, end) {
        return Math.floor(Math.random() * (end - start + 1)) + start;
    }

    function setEntrance() {
        entrance.push(getRandom(0, 100 - passageGap));
        entrance.push(entrance[0] + passageGap);
        entranceElem.style.left = entrance[0] + '%';
        entranceElem.style.top = '97%';
    }

    function setExit() {
        (entrance[0] >= 50) ? exit[0] = getRandom(0, entrance[0] - (passageGap * 2)) : exit[0] = getRandom(entrance[0] + (passageGap * 2), 100 - passageGap);
        exit[1] = exit[0] + passageGap;
        exitElem.style.left = exit[0] + '%';
        exitElem.style.top = '0%';
    }

    function setCharLocation() {
        character.style.left = (entrance[0] + 1) + '%';
        character.style.top = '97%';
    }

    function setWalls() {
        wallsLengths.forEach(function(currVal, idx) {
            var wall = document.createElement("div");
            wall.setAttribute('class', 'wall destroy');
            wall.setAttribute('id', 'wall'+idx);
            document.getElementById('container').appendChild(wall);
            wall.style.height = currVal + '%';
            wall.style.width = '1%';

            (entrance[0] >= 50) ? wall.style.left = getRandom(exit[1], entrance[0]) + '%' : wall.style.left = getRandom(entrance[1], exit[0]) + '%';

            if (getRandom(0, 1) == 0) {
                wall.style.top = '0%';
            } else {
                wall.style.top = (100 - currVal) + '%';
            }

            walls.push(wall);
        });
    }

}