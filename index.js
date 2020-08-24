const authentication = {}
const jwt = require('express-jwt')
const jwks = require('jwks-rsa');


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


module.exports = authentication