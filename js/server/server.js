import express from 'express';
import cors from 'cors';
import { Routes as Router } from './Router/index.js';

const PORT = process.env.PORT || 3000;
let app = express();
app.use(express.static('./js/static'));
app.use('/ts', express.static('./ts/static'));
app.use(cors());
app.use(express.json());
app.use('/', Router);
app.use((request, response) => {
    response.send(`<h1>Hi!</h1>`);
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
