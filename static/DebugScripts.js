"use strict";
//For debugging the various modules
let EM = new EventManager();
let CR = new CanvasRenderer({ size: { width: window.innerWidth, height: window.innerHeight } });
document.body.appendChild(CR.canvas);
