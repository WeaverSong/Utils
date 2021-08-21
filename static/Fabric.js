const Fabric = {
    Queue: {},
    GlobalCatalogued: [],
    fire: function (event, triggers = {})
    {
        //Return if the event doesn't exist.
        if (this.Queue[event] === undefined) return;

        let res;
        this.Queue[event].forEach(ele =>
        {
            if (res !== undefined) return;
            res = ele.func(triggers);
        });
        return res;
    },
    subscribe: function (source, event, func)
    {
        //Fail if there was something wrong with the event, inputs, or this is a duplicate
        if (typeof (func) !== "function"
            || this.Queue[event] === undefined
            || typeof (source) !== "object"
            || this.Queue[event].find(v => v.source === source) !== undefined) return false;

        this.Queue[event].push({ func: func, source: source });

        return true;
    },
    unSubscribe: function (source, event)
    {
        //If event is undefined, we want to unsubscribe from all events
        if (event === undefined)
        {
            for (let key in this.Queue)
            {
                this.Queue[key].forEach((ele, index) =>
                {
                    if (ele.source === source)
                    {
                        this.Queue[key].splice(index, 1);
                    }
                });
            }
            return true;
        }
        else
        {
            //Fail if there was something wrong with the event or inputs
            if (this.Queue[event] == undefined
                || this.Queue[event] === undefined
                || typeof (source) !== 'object') return false;

            //Remove the subscribed function
            let ev = this.Queue[event];
            let temp = ev.splice(
                ev.indexOf(
                    ev.find(i => i.source === source)
                ),
                1);

            //If we failed to remove it, return false;
            if (typeof (temp) !== "object") return false;

            return true;
        }
    },
    addEvent: function (name)
    {
        this.Queue[name] = [];
        return true;
    },
    ProxyRecursive: function (thing, path = "", override = function (item, key, thing) { return false })
    {
        let basePath = path;
        if (path[0] !== "." && path !== "") basePath = "." + path;
        for (let key in thing)
        {

            if (override(thing[key], key, thing)) continue;

            path = basePath + "." + key;

            Fabric.Proxy(key, thing, path);

            if ((typeof (thing[key]) === "object"))
            {
                Fabric.ProxyRecursive(thing[key], path, override);
            }
        }
    },
    Proxy: function (name, object, path) {

        if (Fabric.GlobalCatalogued.indexOf(object[name]) !== -1) return;

        if (path[0] !== "." && path !== "") path = "." + path;

        Fabric.addEvent("get" + path);
        Fabric.addEvent("set" + path);
        Fabric.addEvent("run.pre" + path);
        Fabric.addEvent("run.post" + path);
        Fabric.addEvent("new" + path);
        Fabric.addEvent("defineProperty" + path);
        Fabric.addEvent("deleteProperty" + path);
        Fabric.addEvent("getOwnPropertyDescriptor" + path);
        Fabric.addEvent("getPrototypeOf" + path);
        Fabric.addEvent("has" + path);
        Fabric.addEvent("isExtensible" + path);
        Fabric.addEvent("ownKeys" + path);
        Fabric.addEvent("preventExtensions" + path);
        Fabric.addEvent("setPrototypeOf" + path);

        object[name] = new Proxy(object[name], {
            get: function (obj, prop) {
                let res = Fabric.fire("get" + path, {object: obj, key: prop});
                if (res === undefined) return obj[prop];
                return res;
            },
            set: function (obj, prop, value) {
                let res = Fabric.fire("set" + path, {object: obj, key: prop, value: value});
                if (res === undefined) {
                    obj[prop] = value;
                } else {
                    obj[prop] = res;
                }
                return true;
            },
            apply: function (func, thisArg, argumentsList) {
                let res = Fabric.fire("run.pre" + path, {function: func, this: thisArg, arguments: argumentsList});
                
                if (res !== undefined) return res;

                res = func.call(thisArg, ...argumentsList)
                
                let res2 = Fabric.fire("run.post" + path, {function: func, this: thisArg, arguments: argumentsList, result: res});
                if (res2 !== undefined) return res2;
                return res;
            },
            construct: function (target, argumentsList) {
                let res = Fabric.fire("new" + path, {class: target, arguments: argumentsList});
                if (res !== undefined) return res;

                return new target(...argumentsList);
            },
            defineProperty: function (obj, key, descriptor) {
                let res = Fabric.fire("defineProperty" + path, {object: obj, key: key, descriptor: descriptor});
                if (res === undefined) return Reflect.defineProperty(obj, key, descriptor);
                return true;
            },
            deleteProperty: function (obj, key) {
                let res = Fabric.fire("deleteProperty" + path, {object: obj, key: key});
                if (res === undefined) return Reflect.deleteProperty(obj, key);
                return true;
            },
            getOwnPropertyDescriptor: function (obj, key) {
                let res = Fabric.fire("getOwnPropertyDescriptor" + path, {object: obj, key: key});
                if (res === undefined) return Reflect.getOwnPropertyDescriptor(obj, key);
                return res;
            },
            getPrototypeOf: function (obj) {
                let res = Fabric.fire("getPrototypeOf" + path, {object: obj});
                if (res === undefined) return Reflect.getPrototypeOf(obj);
                return res;
            },
            has: function (obj, key) {
                let res = Fabric.fire("has" + path, {object: obj, key});
                if (res === undefined) return key in obj;
                return res;
            },
            isExtensible: function (obj) {
                Fabric.fire("isExtensible" + path, {object: obj});
                return Reflect.isExtensible(obj);
            },
            ownKeys: function (obj) {
                let res = Fabric.fire("ownKeys" + path, {object: obj});
                if (res === undefined) return Reflect.ownKeys(obj);
                return res;
            },
            preventExtensions: function (obj) {
                let res = Fabric.fire("preventExtensions" + path, {object: obj});
                if (res === undefined) return !Reflect.isExtensible(obj);
                return res;
            },
            setPrototypeOf: function (obj, prototype) {
                let res = Fabric.fire("setPrototypeOf" + path, {object: obj, prototype});
                if (res === undefined) return Reflect.setPrototypeOf(obj, prototype);
                return res;
            }

        });

        Fabric.GlobalCatalogued.push(object[name]);
    }
};