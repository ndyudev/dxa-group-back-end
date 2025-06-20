const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('x-auth-token') || req.header('authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    try {
        if (!process.env.JWT_SECRET) {
            throw new Error('FATAL ERROR: JWT_SECRET is not defined.');
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user || decoded; // Đảm bảo tương thích cả 2 kiểu payload
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
}

function isAdmin(req, res, next) {
    if (req.user && req.user.role === 'admin') {
        return next();
    }
    return res.status(403).json({ msg: 'Access denied. Admins only.' });
}

module.exports = auth;
module.exports.isAdmin = isAdmin;