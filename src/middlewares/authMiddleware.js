const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ success: false, message: 'Token tidak ditemukan' });
    }

    const token = authHeader.split(' ')[1]; // Format: Bearer <token>

    if (!token) {
        return res.status(401).json({ success: false, message: 'Token tidak valid' });
    }

    const secret = process.env.JWT_SECRET || 'defaultsecretkey';

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(403).json({ success: false, message: 'Token tidak sah atau kadaluarsa' });
        }

        req.user = decoded; // menyimpan payload ke request
        next();
    });
};

module.exports = verifyToken;
