const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect route middleware
const protect = async (req, res, next) => {
    let token;

    // Check if the token exists in the Authorization header
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Extract token from the header
            token = req.headers.authorization.split(' ')[1];

            // Decode the token and get the user data
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Find the user from the decoded token
            req.user = await User.findById(decoded.id).select('-password');

            next(); // Allow request to move forward
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };
