const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: { fileSize: 1 * 1024 * 1024 }, // 1MB
    fileFilter: (req, file, cb) => {
        if (!['.jpg', '.png', '.jpeg'].includes(require('path').extname(file.originalname))) {
            return cb(new Error('Invalid file extension'));
        }
        cb(null, true);
    }
}).single('file');

module.exports = (req, res, next) => {
    upload(req, res, err => {
    if (err) return res.status(400).json({ error: err.message });
        next();
    });
};
