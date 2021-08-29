"use strict";
//Create event manager and canvas to display things on
let EM = new EventManager();
let CR = new CanvasRenderer({ size: { width: window.innerWidth, height: window.innerHeight } });
document.body.appendChild(CR.canvas);
//Create a world with our event manager and canvas
let World = new ForgeLite(EM, CR);
//Add a global, downwards gravity
World.gravities.push({ Direction: new Vec2(0, 50), MaxSpeed: 10, Power: 1 });
//Create the player
let Obj = new PhysicsObject(new Vec2(200), new Vec2(0), 10);
//Add the player to the world
World.NewEntity(Obj);
//Add another generic entity to the world
World.NewEntity(new PhysicsObject(new Vec2(225, 300), new Vec2(0), 10));
//Handle clicks
CR.canvas.addEventListener('click', e => {
    let Power = Vec2.Subtract({ x: e.offsetX, y: e.offsetY }, Obj.pos);
    Obj.ApplyMotion(Power, 100);
});
