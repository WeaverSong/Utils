//For debugging the various modules
let EM = new EventManager();
let CR = new CanvasRenderer();
let MM = new MapManager();
document.body.appendChild(CR.canvas);

let h = NearlyJSX;

class Entity {
    constructor (location, size) {
        this.loc = new Vec2(location);
        this.size = size;
        this.vel = new Vec2(0);
        this.accel = new Vec2(0);
    };

    collidesWith(entity) {
        let totalSize = entity.size + this.size;
        let diff = Vec2.Subtract(this.loc, entity.loc).Absolute();
        return diff < totalSize;
    };

    Render(Renderer) {
        Renderer.DrawShape([{x: this.loc.x, y: this.loc.y, type: "Arc", radius: this.size, startAngle: 0, endAngle: Math.PI * 2}], {
            fill: "#000000"
        });
    }
};

class Tentacle {
    constructor(entity) {
        this.offset = Math.random() * entity.size * 2 - entity.size;
        this.size = entity.size / 10;
        this.offsets = [];

        while (this.size % 2 !== 0) this.size++;
        for (let i = 0; i < this.size; i++) {
            let changeDir = (Math.round(Math.random() * 2));
            this.offsets.push({
                dist: this.size * 3,
                offset: Math.random() * this.size * 2 - this.size,
                maxOffset: this.size,
                changeDir: changeDir === 0 ? 1 : changeDir
            });
        };

        this.entity = entity;

        entity.tentacles.push(this);
    };

    Render (Renderer) {
        let Dir = Vec2.Subtract(this.entity.loc, Vec2.Add(this.entity.loc, this.entity.vel)).Absolute().Normalize();
        let PerpDir = new Vec2();
        this.offsets.forEach(i => {
            i.offset += i.changeDir;
            if (i.offset > maxOffset) {
                i.changeDir = -1;
            } else if (i.offset < i.maxOffset * -1) {
                i.changeDir = 1;
            }
        });

        let Points = [{x: this.entity.x}];
        for (let i = 0; i < this.size; i += 2) {
            Points.push({type: "QuadraticCurveTo"});
        }

        Renderer.DrawShape(Points, {

        });

    };
}

class Player extends Entity {
    constructor (location, size, tentacleNum) {
        super(location, size);
        this.tentacles = [];

        for (let i = 0; i < tentacleNum; i++) {
            new Tentacle(this);
        }
    };

    Render(Renderer) {
        super.Render(Renderer);
        this.tentacles.forEach(i => i.Render(Renderer));
    }
};

let player = new Player({x: 300, y: 300}, 50, 10);
player.vel.x = 1;

EM.subscribe(player, 'tick', () => {
    CR.Reset();
    player.Render(CR);
})