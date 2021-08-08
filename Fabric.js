const Fabric = {
    Queue: {},
    GlobalCatalogued: [],
    fire: function (event, triggers = {})
    {
        //Return if the event doesn't exist.
        if (this.Queue[event] === undefined) return;

        this.Queue[event].forEach(ele =>
        {
            let res = ele.func(triggers);
            if (res !== undefined) return res;
        });
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
    Wrap: function (thing, path = "", override = function (item, key, thing) { return false })
    {
        let basePath = path;
        if (path[0] !== "." && path !== "") basePath = "." + path;
        for (let key in thing)
        {

            if (Fabric.GlobalCatalogued.indexOf(thing[key]) !== -1) continue;
            else if (override(thing[key], key, thing)) continue;
            Fabric.GlobalCatalogued.push(thing[key]);

            path = basePath + "." + key;

            if ((typeof (thing[key]) === "object"))
            {
                Fabric.Wrap(thing[key], path, override);
            } else if (typeof (thing[key]) === "function")
            {
                let p = path;

                Fabric.addEvent("pre" + p);
                Fabric.addEvent("post" + p);
                let func = thing[key];

                thing[key] = function ()
                {

                    let res;

                    res = Fabric.fire("pre" + p, { args: arguments, this: this });
                    if (res !== undefined) return res;
                    res = func.call(this, ...arguments);

                    let res2 = Fabric.fire("post" + p, { args: arguments, this: this, res: res });
                    if (res2 === undefined) return res;
                    else return res2;

                }
            }
        }
    }
};