const express = require('express');
const cors = require('cors');
const path = require('path');
//const Router = require('./routes');
//const ErrorPage = require('./routes/404');
const rel = (r) => path.join(__dirname, r);
//const _ = require('./NotQuiteJSX');

let app = express();

app.use(express.static('static'));
app.use(cors());
app.use(express.json());
//app.use('/api/', Router);


app.use((request, response) => {
    response.send(`<h1>Hi!</h1>`);
});


app.listen();