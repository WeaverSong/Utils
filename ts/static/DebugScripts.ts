//For debugging the various modules
let EM = new EventManager();
let CR = new CanvasRenderer({size: {width: window.innerWidth, height: window.innerHeight}});
document.body.appendChild(CR.canvas);

const A = new Vec2(50, 50);
const B = new Vec2(-50, 50);
const C = new Vec2(0, -50);
const D = new Vec2(0, -50);
let MouseVec = new Vec2(window.innerWidth / 2, window.innerHeight / 2);

EM.subscribe(this, 'tick', () => {
    A.RotateTowardsAdd(5, MouseVec);
    B.RotateTowardsMult(0.05, MouseVec.x - window.innerWidth, MouseVec.y);
    C.RotateTowardsAdd(5, MouseVec.x - window.innerWidth / 4, MouseVec.y - window.innerHeight / 2);
    D.RotateTowardsMult(0.05, MouseVec.x - window.innerWidth / 4 * 3, MouseVec.y - window.innerHeight / 2);

    CR.Reset();
    CR.DrawShape([{x: 0, y: 0}, A], {
        line: {
            width: 5
        }
    });
    CR.DrawShape([{x: window.innerWidth, y: 0}, {x: B.x + window.innerWidth, y: B.y}], {
        line: {
            width: 5
        }
    });
    CR.DrawShape([{x: window.innerWidth / 4, y: window.innerHeight / 2}, {x: C.x + window.innerWidth / 4, y: C.y + window.innerHeight / 2}], {
        line: {
            width: 5
        }
    });
    CR.DrawShape([{x: window.innerWidth / 4 * 3, y: window.innerHeight / 2}, {x: D.x + window.innerWidth / 4 * 3, y: D.y + window.innerHeight / 2}], {
        line: {
            width: 5
        }
    });

    CR.DrawShape([{type: "Arc", x: MouseVec.x, y: MouseVec.y, startAngle: 0, endAngle: Math.PI * 2, radius: 5}], {stroke: "#0000"});
});

CR.canvas.addEventListener('click', e => {
    MouseVec = new Vec2(e.offsetX, e.offsetY);
});