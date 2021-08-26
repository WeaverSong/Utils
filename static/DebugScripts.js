//For debugging the various modules
let EM = new EventManager();
let CR = new CanvasRenderer({size: {width: window.innerWidth, height: window.innerHeight}});
let MM = new MapManager();
document.body.appendChild(CR.canvas);

const MakeStar = function (numPoints, offset, x, y) {
    const points = [];

    for (let i = 0; i < numPoints; i++) {

    }

};

let points = [new Vec2(100, 100)];

EM.subscribe(this, 'tick', () => {
    CR.Reset();
    points.forEach(i => {
        CR.DrawShape([{...i, type:"Arc", radius: 10, startAngle: 0, endAngle: Math.PI * 2}], {line: {width: 0}});
    })
})