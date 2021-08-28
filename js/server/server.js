"use strict";
const express = require('express');
const cors = require('cors');
const path = require('path');
const Router = require('./Router/index.js');
const rel = (r) => path.join(__dirname, r);
const PORT = process.env.PORT || 3000;
let app = express();
app.use(express.static(rel('../static')));
app.use('/ts', express.static(rel('../../ts/static')));
app.use(cors());
app.use(express.json());
app.use('/', Router);
app.use((request, response) => {
    response.send(`<h1>Hi!</h1>`);
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
