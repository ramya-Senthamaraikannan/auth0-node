const authentication = {}
const jwt = require('express-jwt')
const jwks = require('jwks-rsa');


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


module.exports = authentication