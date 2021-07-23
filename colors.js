//Returns a random hexadecimal color
const RandomHexColor = function ()
{
    // 16777215 is the highest hex number used in colors
    return "#" + (Math.round(Math.random() * 16777215).toString(16));
};
//Returns a random hsla color with specified hue
const RandomSLAColor = function (hue)
{
    if (hue === undefined) {
        hue = Math.round(Math.random() * 255);
    }

    let sat = Math.round(Math.random() * 80) + 20;
    let light = Math.round(Math.random() * 80) + 20;
    let alpha = Math.random() + 0.3;
    while (alpha > 1) {
        alpha = Math.random() + 0.3;
    }

    
    return `hsla(${hue}deg, ${sat}%, ${light}%, ${alpha})`;
};