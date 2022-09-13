const expressJwt = require('express-jwt');

function authJwt() {
    const secret = process.env.secret;
    const api = process.env.API_URL;
    return expressJwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked
    }).unless({
        path: [
            {url: /\/api\/v1\/products(.*)/ },
            {url: /\/api\/v1\/categories(.*)/ },
            { url: /\/api\/v1\/users(.*)/ },
            { url: /\/api\/v1\/orders(.*)/ },
            { url: /\/api\/v1\/reviews(.*)/ },
            { url: /\/api\/v1(.*)/},
            `${api}/users/login`,
        ]
    })
}

async function isRevoked(req, payload, done) {
    if(!payload.isAdmin) {
        done(null, true)
    }

    done();
}



module.exports = authJwt