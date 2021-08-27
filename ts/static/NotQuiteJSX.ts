const NotQuiteJSX = new Proxy({
    wrap: (...args: string[] | string[][]) => {
        if (typeof(args[0]) === "string") return args.join("");
        return (args[0].join(""));
    },
    style: (input: string | {[index: string]: {[index: string]: string}}) => {
        if (typeof(input) === "string") return `<style>${input}</style>`;

        let output = "";
        output += "<style>";
        for (let ikey in input) {
            let styles = input[ikey];
            output += ikey + "{";
            for (let skey in styles) {
                output += skey + ":" + styles[skey] + ";";
            }
            output += "}";
        }
        output += "</style>";

        return output;
    }
}, {
    get: (target: {[index: string]: Function}, name: string) => {

        if (target[name] !== undefined) return target[name];

        return function () {
            let props: {[index: string]: string} = {};
            let inner = "";

            if (typeof(arguments[0]) == "object") {
                props = [].splice.call(arguments, 0, 1)[0];
            }

            let innerArray = [...arguments];
            if (typeof(arguments[0]) === "object") innerArray = arguments[0];

            innerArray.forEach((ele, index) => {
                inner += ele;
            });

            let propString = " ";
            for (const key in props) {
                propString += `${key}="${props[key]}"`;
            }
            
            return `<${String(name)}${propString}>${inner}</${String(name)}>`;
        }
    }
});