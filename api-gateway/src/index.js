import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import AuthentificationController from './controllers/authentification.controller.js';
const app = express();
app.use(express.json());
app.use('/users', createProxyMiddleware({
    target: 'http://user-service:3001/',
    changeOrigin: true
}));

app.use(AuthentificationController);

app.listen(3000, () => {
    console.log("APi Gateway");
});
