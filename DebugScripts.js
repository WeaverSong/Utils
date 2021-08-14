//For debugging the various modules
let EM = new EventManager([], -1);
let CR = new CanvasRenderer();
let MM = new MapManager();
document.body.appendChild(CR.canvas);


let WindowDefaults = [];
for (key in window) {
    WindowDefaults.push(key);
}

function sayHello() {
    console.log("Hello");
};

window.Echo = {
    Echo: function (message) {
        console.log(message);
    },

    This: function () {
        console.log(this);
    },

    HelloEchos: {
        sayHello: function (name) {console.log("Hello " + name)},
        sayHi: function (name) {console.log("Hi " + name)},
        This: function () {console.log(this);}
    }
};

