const authentication = {}
const jwt = require('express-jwt')
const jwks = require('jwks-rsa');


authentication.jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 15,
        jwksUri: `https://${process.env.DOMAIN}/.well-known/jwks.json`
    }),
    issuer: `https://${process.env.DOMAIN}/`,
    algorithms: ['RS256']
});


authentication.permissionsCheck = (req, res, next, apiPermissions) => {
    if (req.user && req.user.permissions && req.user.permissions.length && apiPermissions && apiPermissions.length) {
        if (apiPermissions.filter(value => req.user.permissions.includes(value)).length) {
            next()
        } else {
            res.sendStatus(401)
        }
    } else {
        res.sendStatus(401)
    }
}

module.exports = authentication