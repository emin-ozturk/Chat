const jwt = require('jsonwebtoken')

const requireAuth = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]
    if (token) {
        jwt.verify(token, 'admin', async (err, decodedToken) => {
            if (err) {
                res.json(err)
            } else {
                // res.json({ status: false, message: 'Oturum açık' })
                next()
            }
        })
    } else {
        res.json({ status: false, message: 'Oturum açık değil' })
        next()
    }
}

const currentUserID = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, 'admin', (err, decodedToken) => {
            if (err) {
                reject(err);
            } else {
                resolve(decodedToken._id);
            }
        });
    });
};


module.exports = {
    currentUserID,
    requireAuth
}

