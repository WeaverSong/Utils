//Takes an object with x and y, an array of 2 items, 2 parameters, or 1 parameter.
class Vec2 {
    constructor (x, y)
    {
        if (typeof(x) === "object" && x.x !== undefined) {
            this.x = x.x;
            this.y = x.y;
        } else if (typeof(x) === "object") {
            this.x = x[0];
            this.y = x[1];
        } else if (y !== undefined) {
            this.x = x;
            this.y = y;
        } else {
            this.x = x;
            this.y = x;
        }
    };

    //Adds a vector or a number, and returns this
    Add (x, y) {
        let vec = new Vec2(x, y)

        this.x += vec.x;
        this.y += vec.y;
        return this;
    };
    //Subtracts a vector or number, and returns this
    Subtract (x, y) {
        let vec = new Vec2(x, y)

        this.x -= vec.x;
        this.y -= vec.y;
        return this;
    };
    //Multiplies a vector or number, and returns this
    Multiply (x, y) {
        let vec = new Vec2(x, y)

        this.x *= vec.x;
        this.y *= vec.y;
        return this;
    };
    //Divides a vector or number, and returns this
    Divide (x, y) {
        let vec = new Vec2(x, y)

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
    //Absolutes the vector and returns this
    Absolute () {
        this.x = Math.abs(this.x);
        this.y = Math.abs(this.y);
        return this;
    }


    //Static methods

    //Add 2 vectors, or a vector and a number
    static Add (vec1, vec2) {
        vec1 = new Vec2(vec1);
        vec2 = new Vec2(vec2);
        return new Vec2(vec1.x + vec2.x, vec1.y + vec2.y);
    };
    //Subtract 2 vectors, or a vector and a number
    static Subtract (vec1, vec2) {
        vec1 = new Vec2(vec1);
        vec2 = new Vec2(vec2);
        return new Vec2(vec1.x - vec2.x, vec1.y - vec2.y);
    };
    //Multiply 2 vectors, or a vector and a number
    static Multiply (vec1, vec2) {
        vec1 = new Vec2(vec1);
        vec2 = new Vec2(vec2);
        return new Vec2(vec1.x * vec2.x, vec1.y * vec2.y);
    };
    //Divide 2 vectors, or a vector and a number
    static Divide (vec1, vec2) {
        vec1 = new Vec2(vec1);
        vec2 = new Vec2(vec2);
        return new Vec2(vec1.x / vec2.x, vec1.y / vec2.y);
    };
    //Get the magnitue of a vector, by single or double input
    static Magnitude (x, y) {
        let vec = new Vec2(x, y);
        return (Math.sqrt(vec.x * vec.x + vec.y * vec.y));
    };
    //Returns the normalized form of the vector, by single or double input
    static Normalized (x, y) {
        let vec = new Vec2(x, y);
        return vec.Divide(vec.Magnitude());
    };
    //Returns the absoluted form of the vector, by single or double input
    static Absolute (x, y) {
        let vec = new Vec2(x, y);
        return vec.Absolute();
    }
};

//Takes an object with x, y and z, an array of 3 items, 3 numbers, or 1 number.
class Vec3 {
    constructor (x, y, z)
    {
        if (typeof(x) === "object" && x.x !== undefined && x.z !== undefined) {
            this.x = x.x;
            this.y = x.y;
            this.z = x.z;
        } else if (typeof(x) === "object") {
            this.x = x[0];
            this.y = x[1];
            this.z = x[2];
        } else if (y !== undefined) {
            this.x = x;
            this.y = y;
            this.z = z;
        } else {
            this.x = x;
            this.y = x;
            this.z = x;
        }

        if (this.x === undefined) this.x = 0;
        if (this.y === undefined) this.y = 0;
        if (this.z === undefined) this.z = 0;
    };

    //Adds a vector or a number, and returns this
    Add (x, y, z) {
        let vec = new Vec3 (x, y, z);

        this.x += vec.x;
        this.y += vec.y;
        this.z += vec.z;
        return this;
    };
    //Subtracts a vector or number, and returns this
    Subtract (x, y, z) {
        let vec = new Vec3 (x, y, z);

        this.x -= vec.x;
        this.y -= vec.y;
        this.z -= vec.z;
        return this;
    };
    //Multiplies a vector or number, and returns this
    Multiply (x, y, z) {
        let vec = new Vec3 (x, y, z);

        this.x *= vec.x;
        this.y *= vec.y;
        this.z *= vec.z;
        return this;
    };
    //Divides a vector or number, and returns this
    Divide (x, y, z) {
        let vec = new Vec3 (x, y, z);

        this.x /= vec.x;
        this.y /= vec.y;
        this.z /= vec.z;
        return this;
    };
    //Normalizes the vector, and returns this
    Normalize () {
        let vec = Vec3.Normalized(this);
        this.x = vec.x;
        this.y = vec.y;
        this.z = vec.z;
        return this;
    };
    //Returns the magnitude of the vector
    Magnitude () {
        return Vec3.Magnitude(this);
    };
    //Returns the normalized equivalent of the vector
    Normalized () {
        return Vec3.Normalized(this);
    };
    //Absolutes the vector
    Absolute () {
        this.x = Math.abs(this.x);
        this.y = Math.abs(this.y);
        this.z = Math.abs(this.z);
        return this;
    }


    //Static methods

    //Add 2 vector-types
    static Add (vec1, vec2) {
        vec1 = new Vec3(vec1);
        vec2 = new Vec3(vec2);
        return vec1.Add(vec2);
    };
    //Subtract 2 vector-types
    static Subtract (vec1, vec2) {
        vec1 = new Vec3(vec1);
        vec2 = new Vec3(vec2);
        return vec1.Subtract(vec2);
    };
    //Multiply 2 vector-types
    static Multiply (vec1, vec2) {
        vec1 = new Vec3(vec1);
        vec2 = new Vec3(vec2);
        return vec1.Multiply(vec2);
    };
    //Divide 2 vector-types
    static Divide (vec1, vec2) {
        vec1 = new Vec3(vec1);
        vec2 = new Vec3(vec2);
        return vec1.Divide(vec2);
    };
    //Get the magnitue of a vector-type, by single or triple input
    static Magnitude (x, y, z) {
        let vec = new Vec3(x, y, z);
        return (Math.sqrt(vec.x * vec.x + vec.y * vec.y + vec.z * vec.z));
    };
    //Returns the normalized form of a vector-type, by single or triple input
    static Normalized (x, y, z) {
        let vec = new Vec3(x, y, z);
        return vec.Divide(vec.Magnitude());
    };
    //Returns the absoluted form of the vector, by single or triple input
    static Absolute (x, y, z) {
        let vec = new Vec3(x, y, z);
        return vec.Absolute();
    }
};

//Creates a vector with an arbitrary number of values. Can take in a VecX, Vec2, Vec3, Array, or number;
class VecX {
    constructor (values) {
        if (typeof(values) === "number") values = [values];
        else if (typeof(values) === "object" && typeof(values.values) === "object") values = values.values;
        else if (typeof(values) === "object" && values.x !== undefined && values.z === undefined) values = [values.x, values.y];
        else if (typeof(values) === "object" && values.x !== undefined) values = [values.x, values.y, values.z];
        this.values = values;
        this.size = values.length;
    };

    //Adds a second Vector-type. Returns this.
    Add (values) {
        let vec = new VecX (values);
        while (vec.size < this.size) {
            vec.values.push(vec.values[0]);
            vec.size++;
        };

        this.values = this.values.map((val, index) => val + vec.values[index]);

        return this;
    };
    //Subtracts a second Vector-type. Returns this.
    Subtract (values) {
        let vec = new VecX (values);
        while (vec.size < this.size) {
            vec.values.push(vec.values[0]);
            vec.size++;
        };

        this.values = this.values.map((val, index) => val - vec.values[index]);

        return this;
    };
    //Multiplies by a second Vector-type. Returns this.
    Multiply (values) {
        let vec = new VecX (values);
        while (vec.size < this.size) {
            vec.values.push(vec.values[0]);
            vec.size++;
        };

        this.values = this.values.map((val, index) => val * vec.values[index]);

        return this;
    };
    //Divides by a second Vector-type. Returns this.
    Divide (values) {
        let vec = new VecX (values);
        while (vec.size < this.size) {
            vec.values.push(vec.values[0]);
            vec.size++;
        };

        this.values = this.values.map((val, index) => val / vec.values[index]);

        return this;
    };
    //Normalizes this VecX. Returns this.
    Normalize () {
        this.values = VecX.Normalized(this).values;
        return this;
    };
    //Returns the magnitude of this VecX
    Magnitude () {
        return VecX.Magnitude(this);
    };
    //Returns the normalized equivalent of this VecX
    Normalized () {
        return VecX.Normalized(this);
    }
    //Absolutes the vector
    Absolute () {
        this.value = this.values.map(i => Math.abs(i));
    }


    //Static methods

    //Adds 2 Vector-types
    static Add (vec1, vec2) {
        vec1 = new VecX (vec1);
        vec2 = new VecX (vec2);
        return vec1.Add(vec2);
    };
    //Subtracts 2 Vector-types
    static Subtract (vec1, vec2) {
        vec1 = new VecX (vec1);
        vec2 = new VecX (vec2);
        return vec1.Subtract(vec2);
    };
    //Multiplies 2 Vector-types
    static Add (vec1, vec2) {
        vec1 = new VecX (vec1);
        vec2 = new VecX (vec2);
        return vec1.Multiply(vec2);
    };
    //Adds 2 Vector-types
    static Divide (vec1, vec2) {
        vec1 = new VecX (vec1);
        vec2 = new VecX (vec2);
        return vec1.Divide(vec2);
    };
    //Returns the magnitude of a Vector-type
    static Magnitude (vec) {
        vec = new VecX (vec);
        return Math.sqrt(vec.values.reduce((adder, value) => adder + value * value, 0));
    };
    //Returns the normalized form of a Vector-type
    static Normalized (vec) {
        vec = new VecX (vec);
        return vec.Divide(vec.Magnitude());
    };
    //Returns the absoluted form of a Vector-type
    static Absolute (vec) {
        let Vec = new VecX(vec);
        return Vec.Absolute();
    }
}