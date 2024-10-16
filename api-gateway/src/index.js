import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send("API Gateway is working");
});

app.listen(3000, () => {
    console.log("APi Gateway");
});
