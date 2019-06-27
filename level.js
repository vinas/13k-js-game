
function Level() {
    
    var wallsLengths = [];
    var entrancePos;
    var entranceElem = document.getElementById('entrance');
    var exitElem = document.getElementById('exit');
    var character = document.getElementById('char01');
    var vertPassageGap = charHeight + gapBorderTolerance;
    var horPassageGap = charWidth + gapBorderTolerance;
    var wallWidth = 1;

    this.generate = generate;

    return this;

    function generate() {
        entrancePos = (getRandom(0, 1) == 0) ? 'left' : 'right';
        setEntrance();
        setExit();
        setCharLocation();
        setWalls();
        //setEnemy();
    }

    function calcMaxWallLength() {
        return getRandom(40, 100 - vertPassageGap);
    }

    function getRandom(start, end) {
        return Math.floor(Math.random() * (end - start + 1)) + start;
    }

    function setEntrance() {
        entranceElem.style.left = (entrancePos == 'left') ? '1%' : '93%';
        entranceElem.style.top = '97%';
    }

    function setExit() {
        exitElem.style.left = (entrancePos == 'left') ? '93%' : '1%';
        exitElem.style.top = '0%';
    }

    function setCharLocation() {
        character.style.left = (entrancePos == 'left') ? '2.5%' : '93.5%';
        character.style.top = '97%';
    }

    function setEnemy() {
        let enemy = document.createElement("div");
        enemy.setAttribute('class', 'enemy destroy');
        enemy.setAttribute('id', 'enemy');
        document.getElementById('container').appendChild(enemy);
        enemy.style.height = charHeight + '%';
        enemy.style.width = charWidth + '%';
        enemy.style.left = (entrancePos == 'left') ? getRandom(50, 100 - charWidth) + '%' : getRandom(0, 50 - charWidth) + '%';
        enemy.style.top = getRandom(0, 100 - charHeight);
    }

    function setWalls() {
        for (let i = 1; i <= wallsAmount; i++) {
            let height = parseFloat(calcMaxWallLength(i+1));
            let wall = document.createElement("div");
            wall.setAttribute('class', 'wall destroy');
            wall.setAttribute('id', 'wall'+i);
            document.getElementById('container').appendChild(wall);
            wall.style.height = height + '%';
            wall.style.width = wallWidth + '%';
            wall.style.left = setWallLeft(height);
            wall.style.top = (getRandom(0, 1) == 0) ? '0%' : (100 - height) + '%';
            walls.push(wall);
        };
    }

    function setWallLeft(teste) {
        let left = getRandom(8, 90);
        let forbidenArea = 2 * horPassageGap + wallWidth;
        let forbidenZones = [];
        forbidenZones.push([0, 7]);
        forbidenZones.push([91, 100]);
        for (let i = 0; i < walls.length; i++) {
            let forbLeft = movements.getCoord(walls[i].style.left);
            forbidenZones.push([
                forbLeft - horPassageGap,
                forbLeft + forbidenArea
            ]);
        }
        for (let i = 0; i < forbidenZones.length; i++) {
            if (left + wallWidth >= forbidenZones[i][0] && left <= forbidenZones[i][1]) {
                left = getRandom(8, 90);
                i = -1;
            }
        }
        return left + '%';
    }

}