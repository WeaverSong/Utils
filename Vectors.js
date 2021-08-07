//Takes an object with x and y, or 2 parameters.
class Vec2 {
    constructor (x, y)
    {
        if (typeof(x) === "object") {
            this.x = x.x;
            this.y = x.y;
        } else {
            this.x = x;
            this.y = y;
        }
    };

    //Adds a vector or a number, and returns this
    Add (x, y) {
        let vec = x;
        if (typeof(x) === "number" && y === undefined) vec = {x: x, y: x};
        else if (typeof(x) === "number") vec = {x: x, y: y};

        this.x += vec.x;
        this.y += vec.y;
        return this;
    };
    //Subtracts a vector or number, and returns this
    Subtract (x, y) {
        let vec = x;
        if (typeof(x) === "number" && y === undefined) vec = {x: x, y: x};
        else if (typeof(x) === "number") vec = {x: x, y: y};

        this.x -= vec.x;
        this.y -= vec.y;
        return this;
    };
    //Multiplies a vector or number, and returns this
    Multiply (x, y) {
        let vec = x;
        if (typeof(x) === "number" && y === undefined) vec = {x: x, y: x};
        else if (typeof(x) === "number") vec = {x: x, y: y};

        this.x *= vec.x;
        this.y *= vec.y;
        return this;
    };
    //Divides a vector or number, and returns this
    Divide (x, y) {
        let vec = x;
        if (typeof(x) === "number" && y === undefined) vec = {x: x, y: x};
        else if (typeof(x) === "number") vec = {x: x, y: y};

        this.x /= vec.x;
        this.y /= vec.y;
        return this;
    };
    //Normalizes the vector, and returns this
    Normalize () {
        let vec = Vec2.Normalized(this);
        this.x = vec.x;
        this.y = vec.y;
        return this;
    };
    //Returns the magnitude of the vector
    Magnitude () {
        return Vec2.Magnitude(this);
    };
    //Returns the normalized equivalent of the vector
    Normalized () {
        return Vec2.Normalized(this);
    };


    //Static methods

    //Add 2 vectors, or a vector and a number
    static Add (vec1, vec2) {
        if (typeof(vec2) === "number") vec2 = {x: vec2, y: vec2}
        return new Vec2(vec1.x + vec2.x, vec1.y + vec2.y);
    };
    //Subtract 2 vectors, or a vector and a number
    static Subtract (vec1, vec2) {
        if (typeof(vec2) === "number") vec2 = {x: vec2, y: vec2}
        return new Vec2(vec1.x - vec2.x, vec1.y - vec2.y);
    };
    //Multiply 2 vectors, or a vector and a number
    static Multiply (vec1, vec2) {
        if (typeof(vec2) === "number") vec2 = {x: vec2, y: vec2}
        return new Vec2(vec1.x * vec2.x, vec1.y * vec2.y);
    };
    //Divide 2 vectors, or a vector and a number
    static Divide (vec1, vec2) {
        if (typeof(vec2) === "number") vec2 = {x: vec2, y: vec2}
        return new Vec2(vec1.x / vec2.x, vec1.y / vec2.y);
    };
    //Get the magnitue of a vector, by single or double input
    static Magnitude (x, y) {
        let vec = x;

        if (typeof(x) === "number") vec = {x: x, y: y};

        return (Math.sqrt(vec.x * vec.x + vec.y * vec.y));
    };
    //Returns the normalized form of the vector, by single or double input
    static Normalized (x, y) {
        let vec = x;
        if (typeof(x) === "number") vec = {x: x, y: y};
        return new Vec2(vec).Divide(Vec2.Magnitude(vec));
    };
};