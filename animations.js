
function Animations() {

    this.blinkBackground = blinkBackground;

    return this;

    function blinkBackground(elm, loops, color1, color2) {
        var colors = [color1, color2],
            i = 0,
            bkg = elm.backgroundColor;
            
        var loop = setInterval(function() {
            if (i == loops * 2)  {
                elm.backgroundColor = bkg;
                clearInterval(loop);
                return;
            }
            (i % 2 == 0) ? idx = 0 : idx = 1;
            elm.backgroundColor = colors[idx];
            i++;
        }, 80);
    }

}
