API authentication using auth0 JSON WEB TOKENS

# Installation

```bash
npm install auth0-node
```

# Usage

Validating API tokens needs express-jwt and jwks-rsa to validate the API

```javascript
const jwt = require('express-jwt')
const jwks = require('jwks-rsa');
```

**process.env.AUDIENCE** optional parameter takes clientId, for which the api to be validated

ex: vskjvjdb(clientId of a specific application)

**process.env.DOMAIN** parameter takes the domain name from the auth0 

ex: https://xyz.com/

```javascript
authentication.jwtCheck = (audience = null) => jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 15,
        jwksUri: `https://${process.env.DOMAIN}/.well-known/jwks.json`
    }),
    //AUDIENCE is the clientId of an application, provide this if you need an API to be validated specifically for a single client
    audience: audience ? process.env.AUDIENCE : null,
    issuer: `https://${process.env.DOMAIN}/`,
    algorithms: ['RS256']
});

```
