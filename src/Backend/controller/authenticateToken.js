const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_secret_key';

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Get token from the Authorization header

    if (!token) {
        return res.status(400).json({ error: 'Access denied, no token provided' });
    }

    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified; // Attach user info to request object
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = authenticateToken;


