# Express Microservice

## Init

Dans api-gateway et user-service installer les packages nodes
`
npm install
`

Lancer l'application
`
docker compose up
`

L'API Gateway se situe sur l'URL : <http://localhost:3000/>
User service se situe sur l'URL : <http://localhost:3001/>

## Test Oauth2

Faire une requête POST sur : <http://localhost:3000/oauth2/authorize?client_id=OAUTH_TEST_APP>

```bash
curl --location --request POST 'http://localhost:3000/oauth2/authorize?client_id=OAUTH_TEST_APP'
```

Récupérer le code d'autorisation

Faire une requête POST en remplaçant AUTH_CODE par celui récupérer dans la requête précédente : <http://localhost:3000/oauth2/token?authorization_code=AUTH_CODE>

```bash
curl --location 'http://localhost:3000/oauth2/token?authorization_code=AUTH_CODE' \
--header 'Content-Type: application/json' \
--data '{
    "login": "login"
}'
```
