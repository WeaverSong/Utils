//For debugging the various modules
let EM = new EventManager([], -1);
let CR = new CanvasRenderer();
let MM = new MapManager();
//document.body.appendChild(CR.canvas);

let h = html;

let Res = h.wrap(
    h.style({
        body: {
            display: "flex"
        },

        div: {
            "background-color": "black",
            width: "100px",
            height: "100px",
            display: "inline-block"
        }
    }),
    
    h.div(),
    h.div({id: "hi"})
);

//console.log(Res);

let CF = new CanFlex();