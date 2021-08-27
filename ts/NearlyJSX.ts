const NearlyJSX = new Proxy({
    style: (input: string | {[index: string]: {[index: string]: string}}) => {

        let style = document.createElement('style');

        if (typeof(input) === "string") {
            style.innerHTML =  input;
            return style;
        }

        let output = "";

        for (let ikey in input) {
            let styles = input[ikey];
            output += ikey + "{";
            for (let skey in styles) {
                output += skey + ":" + styles[skey] + ";";
            }
            output += "}";
        }
        style.innerHTML = output;
        return style;
    }
}, {
    get: (target: {[index: string]: Function}, name: string) => {

        if (target[name] !== undefined) return target[name];

        return function (...args: Array<HTMLElement> | [{ attributes?: {[index: string]: string}, style?: {[index: string]: string}, eventListeners?: {[index: string]: Function} }, ...Array<HTMLElement>]) {
            let ele = document.createElement(name)

            if (typeof(args[0]) === "object") {
                let props = args[0];
                args.splice(0, 1);

                for (const key in props) {

                    if (key === "attributes") {
                        for (const key in props.attributes) {
                            //@ts-ignore
                            ele.setAttribute(key, props.attributes[key]);
                        };
                    } else if (key === "style") {
                        for (const pkey in props.style) {
                            //@ts-ignore
                            ele.style[pkey] = props.style[pkey];
                        }
                    } else if (key === "eventListeners") {
                        //@ts-ignore
                        for (const ekey in props.eventListeners) {
                            //@ts-ignore
                            ele.addEventListener(ekey, props.eventListeners[ekey]);
                        }
                    } else {
                        //@ts-ignore
                        ele[key] = props[key];
                    }

                }
            };

            args.forEach(i => {
                if (typeof(i) === "string" || typeof(i) === "boolean" || typeof(i) === "number") ele.textContent += i;
                //@ts-ignore
                else if (i) ele.appendChild(i);
            });

            return ele;
        }
    }
});