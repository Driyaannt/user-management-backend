module.exports = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token !== 'Bearer dummy_token') {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
};
