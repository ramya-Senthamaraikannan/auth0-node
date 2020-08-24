# Introduction 
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

**audience** parameter takes API path to which the token to be validated
ex: https://xyz.com/authcheck

**domain** parameter takes the domain name from the auth0 client application
ex: https://xyz.com/

```javascript
authentication.jwtCheck = (audience, domain) => jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${domain}.well-known/jwks.json`
    }),
    audience: audience,
    issuer: domain,
    algorithms: ['RS256']
});
```
