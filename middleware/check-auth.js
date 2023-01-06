//write a check-auth middleware
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, 'secret_this_should_be_longer');
        const userId = decodedToken.userId;
        User.findById(userId).then(user => {
            if (!user) {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            req.userData = { email: user.email, userId: user._id };
            next();
        }).catch(err => {
            return res.status(401).json({
                message: 'Auth failed'
            });
        });
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};