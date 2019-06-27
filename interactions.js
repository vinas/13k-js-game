
function Interactions() {

    init();

    function init() {
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
    }
}
