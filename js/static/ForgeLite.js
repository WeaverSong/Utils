"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _PhysicsObject_image;
;
class ForgeLite {
    constructor(EM = new EventManager(), CR = new CanvasRenderer({})) {
        this.borderType = "solid";
        this.entities = [];
        this.gravities = [];
        this.CanvasRenderer = CR;
        this.EventManager = EM;
        this.EventManager.subscribe(this, 'tick', () => this.Tick());
        this.size = CR.Size();
    }
    ;
    NewEntity(entity) {
        this.entities.push(entity);
        entity.Init(this);
    }
    ;
    Tick() {
        this.HandleGravity();
        this.TickEntities();
        this.Render();
    }
    ;
    Render() {
        this.CanvasRenderer.Reset();
        this.entities.forEach(i => {
            let image = i.Render();
            this.CanvasRenderer.DrawImageData(image, i.pos, {});
        });
    }
    ;
    HandleGravity() {
        this.entities.forEach(i => {
            if (i.noGravity)
                return;
            this.gravities.forEach(g => {
                if (i.speed.Magnitude() < g.MaxSpeed)
                    i.ApplyMotion(g.Direction.Normalized(), g.Power, false);
            });
        });
    }
    ;
    TickEntities() {
        this.entities.forEach(i => {
            i.speed.Add(Vec2.Multiply(i.acceleration, 0.1));
            i.acceleration.Multiply(0.98);
            if (!i.noFriction) {
                i.speed.Multiply(0.95);
            }
            ;
            i.pos.x += i.speed.x;
            if (!i.noCollide) {
                this.entities.forEach(e => {
                    if (e.noCollide || e === i)
                        return;
                    if (!Collides(i, e))
                        return;
                    while (Collides(i, e)) {
                        i.pos.x -= i.speed.x * 0.1;
                    }
                    e.ApplyMotion(i.speed, i.acceleration.Magnitude() + i.speed.Magnitude());
                    i.speed.x = 0;
                    i.acceleration.x = 0;
                    if (!i.noFriction && !e.noFriction) {
                        i.speed.Multiply(1 - (i.friction + e.friction));
                        i.acceleration.Multiply(1 - (i.friction + e.friction));
                    }
                    ;
                });
            }
            ;
            i.pos.y += i.speed.y;
            if (!i.noCollide) {
                this.entities.forEach(e => {
                    if (e.noCollide || e === i)
                        return;
                    if (!Collides(i, e))
                        return;
                    while (Collides(i, e)) {
                        i.pos.y -= i.speed.y * 0.1;
                    }
                    e.ApplyMotion(i.speed, i.acceleration.Magnitude() + i.speed.Magnitude());
                    i.speed.y = 0;
                    i.acceleration.y = 0;
                    if (!i.noFriction && !e.noFriction) {
                        i.speed.Multiply(1 - (i.friction + e.friction));
                        i.acceleration.Multiply(1 - (i.friction + e.friction));
                    }
                });
            }
            ;
            if (!i.noCollide && this.borderType === "solid") {
                if (i.pos.y + i.hitBoxGeneric * 2 >= this.size.height) {
                    i.pos.y = this.size.height - i.hitBoxGeneric * 2;
                    i.speed.y = 0;
                    i.acceleration.y = 0;
                    if (!i.noFriction) {
                        i.speed.Multiply(0.9);
                        i.acceleration.Multiply(0.9);
                    }
                }
                ;
                if (i.pos.y <= 0) {
                    i.pos.y = 0;
                    i.speed.y = 0;
                    i.acceleration.y = 0;
                    if (!i.noFriction) {
                        i.speed.Multiply(0.9);
                        i.acceleration.Multiply(0.9);
                    }
                }
                ;
                if (i.pos.x <= 0) {
                    i.pos.x = 0;
                    i.speed.x = 0;
                    i.acceleration.x = 0;
                    if (!i.noFriction) {
                        i.speed.Multiply(0.98);
                        i.acceleration.Multiply(0.98);
                    }
                }
                ;
                if (i.pos.x + i.hitBoxGeneric * 2 >= this.size.width) {
                    i.pos.x = this.size.width - i.hitBoxGeneric * 2;
                    i.speed.x = 0;
                    i.acceleration.x = 0;
                    if (!i.noFriction) {
                        i.speed.Multiply(0.98);
                        i.acceleration.Multiply(0.98);
                    }
                }
                ;
            }
            ;
        });
    }
    ;
}
;
const DoLinesCollide = function (line1, line2) {
    if (Math.max(line1[0].x, line1[1].x) < Math.min(line2[0].x, line2[1].x))
        return false;
    if (Math.max(line2[0].x, line2[1].x) < Math.min(line1[0].x, line1[1].x))
        return false;
    if (Math.max(line1[0].y, line1[1].y) < Math.min(line2[0].y, line2[1].y))
        return false;
    if (Math.max(line2[0].y, line2[1].y) < Math.min(line1[0].y, line1[1].y))
        return false;
    const interval = [
        Math.min(Math.min(line1[0].x, line1[1].x), Math.min(line2[0].x, line2[1].x)),
        Math.max(Math.max(line1[0].x, line1[1].x), Math.max(line2[0].x, line2[1].x))
    ];
    const slope1 = (line1[0].y - line1[1].y) / (line1[0].x - line1[1].x);
    const slope2 = (line2[0].y - line2[1].y) / (line2[0].x - line2[1].x);
    if (slope1 === slope2)
        return false;
    const yintercept1 = line1[0].y - slope1 * line1[0].x;
    const yintercept2 = line2[0].y - slope2 * line2[0].x;
    const interceptX = (yintercept2 - yintercept1) / (slope1 - slope2);
    if (interceptX < interval[0] || interceptX > interval[1])
        return false;
    return true;
};
const Collides = function (obj1, obj2) {
    const dist = Vec2.Subtract(obj1.pos, obj2.pos).Magnitude();
    if (dist > obj1.hitBoxGeneric + obj2.hitBoxGeneric)
        return false;
    for (let i = 1; i < obj1.hitBox.length; i++) {
        const line1 = [{ x: obj1.hitBox[i - 1].x + obj1.pos.x, y: obj1.hitBox[i - 1].y + obj1.pos.y }, { x: obj1.hitBox[i].x + obj1.pos.x, y: obj1.hitBox[i].y + obj1.pos.y }];
        for (let a = 1; a < obj2.hitBox.length; a++) {
            const line2 = [{ x: obj2.hitBox[a - 1].x + obj2.pos.x, y: obj2.hitBox[a - 1].y + obj2.pos.y }, { x: obj2.hitBox[a].x + obj2.pos.x, y: obj2.hitBox[a].y + obj2.pos.y }];
            if (DoLinesCollide(line1, line2))
                return true;
        }
        ;
    }
    ;
    return false;
};
class PhysicsObject {
    constructor(pos, rotation, mass) {
        this.friction = 0.4;
        this.noGravity = false;
        this.noFriction = false;
        this.noCollide = false;
        _PhysicsObject_image.set(this, void 0);
        this.pos = pos;
        this.rotation = rotation;
        this.speed = new Vec2(0);
        this.acceleration = new Vec2(0);
        this.mass = mass;
        let temp = new CanvasRenderer({ size: { width: 50, height: 50 } });
        temp.DrawShape([{ x: 0, y: 0 }, { x: 50, y: 0 }, { x: 50, y: 50 }, { x: 0, y: 50 }], {});
        __classPrivateFieldSet(this, _PhysicsObject_image, temp.GetImageData(), "f");
        this.hitBoxGeneric = 35;
        this.hitBox = [{ x: 0, y: 0 }, { x: 50, y: 0 }, { x: 50, y: 50 }, { x: 0, y: 50 }, { x: 0, y: 0 }];
    }
    ;
    Init(World) {
        this.world = World;
    }
    ;
    Render() {
        return __classPrivateFieldGet(this, _PhysicsObject_image, "f");
    }
    ;
    ApplyMotion(Direction, Power, MassCalc = true) {
        if (MassCalc)
            this.acceleration.Add(Vec2.Multiply(Direction.Normalized(), Power / this.mass));
        else
            this.acceleration.Add(Vec2.Multiply(Direction.Normalized(), Power));
    }
    ;
}
_PhysicsObject_image = new WeakMap();
;
