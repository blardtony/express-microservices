import express from 'express';
import { tryConnectDatabase } from './config/database.js';

const app = express();

app.get('/', (req, res) => {
    res.send("User service is working");
});

app.listen(3000, () => {
    tryConnectDatabase();
    console.log("User service");
});
