import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import {AuthorizationCodeList, authorizedClient} from '../services/authorization.service.js';
import jwt from 'jsonwebtoken';

const AuthenticationController = Router();

AuthenticationController.post('/oauth2/authorize', (req, res) => {
    const query = req.query;
    const clientId = String(query.client_id);
    if (!authorizedClient[clientId]) {
        return res.status(401).send({ error: 'Unauthorized client' });
    }
    const authorizationCode = uuidv4();
    const expiredAt = new Date();

    expiredAt.setMinutes(expiredAt.getMinutes() + 10);


    AuthorizationCodeList.push({ clientId: clientId, authorizationCode: authorizationCode, expiredAt: expiredAt });

    return res.status(200).send({ authorizationCode });
});


AuthenticationController.post('/oauth2/token', async (req, res) => {
    const queryParams = req.query;
    const { login } = req.body;

    const authorization = AuthorizationCodeList.find(
        (element) => element.authorizationCode === queryParams.authorization_code,
    );

    if (!authorization) {
        return res.status(401).send({ error: 'Invalid authorization code' });
    }

    const now = new Date();

    if (now > authorization.expiredAt) {
        return res.status(401).send({ error: 'Authorization code expired' });
    }

    const accessToken = jwt.sign(
        { login: login },
        'SecretInternalPrivateKey',
        { expiresIn: '7d' },
    );
    return res.status(200).send({ accessToken, tokenType: 'Bearer', expiresIn: '7d' });
});

export default AuthenticationController;