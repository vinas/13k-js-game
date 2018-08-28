function blinkBackground(elm, loops, color1, color2) {
    var colors = [color1, color2],
        i = 0,
        bkg = elm.backgroundColor;
        
    var teste = setInterval(function() {
        if (i == loops * 2)  {
            elm.backgroundColor = bkg;
            clearInterval(teste);
            return;
        }
        (i % 2 == 0) ? idx = 0 : idx = 1;
        elm.backgroundColor = colors[idx];
        i++;
    }, 80);
}