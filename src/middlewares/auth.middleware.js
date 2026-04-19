const jwt = require('jsonwebtoken');
const tokenBlacklistToken = require('../models/blacklist.model');


async function authUser(req, res, next) {

    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            message: 'Token not found, authorization denied'
        })

    }

    const isTokenBlacklisted =  await tokenBlacklistToken.findOne({ token })
    
    if (isTokenBlacklisted) {
        return res.status(401).json({
            message: 'Token is Invalid, authorization denied'
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()

    } catch (err) {
        return res.status(401).json({
            message: 'Invalid token, authorization denied'
        })


    }
}

module.exports = {
    authUser
};