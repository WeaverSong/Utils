"use strict";
//For debugging the various modules
let EM = new EventManager();
let CR = new CanvasRenderer({ size: { width: window.innerWidth, height: window.innerHeight } });
document.body.appendChild(CR.canvas);
const A = new Vec2(50, 50);
const B = new Vec2(50, 50);
let MouseVec = new Vec2(50, 50);
EM.subscribe(this, 'tick', () => {
    A.RotateTowardsAdd(5, MouseVec);
    B.RotateTowardsMult(0.05, MouseVec.x - window.innerWidth, MouseVec.y);
    CR.Reset();
    CR.DrawShape([{ x: 0, y: 0 }, A], {
        line: {
            width: 5
        }
    });
    CR.DrawShape([{ x: window.innerWidth, y: 0 }, { x: B.x + window.innerWidth, y: B.y }], {
        line: {
            width: 5
        }
    });
    CR.DrawShape([{ type: "Arc", x: MouseVec.x, y: MouseVec.y, startAngle: 0, endAngle: Math.PI * 2, radius: 5 }], { stroke: "#0000" });
});
CR.canvas.addEventListener('click', e => {
    MouseVec = new Vec2(e.offsetX, e.offsetY);
});
