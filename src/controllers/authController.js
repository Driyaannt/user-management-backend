const { findUserByEmail } = require('../repository/authRepository');
const bcrypt = require('bcrypt');
const e = require('express');
const jwt = require('jsonwebtoken');
const db = require('../database'); // Pastikan path ini sesuai dengan struktur project Anda

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await findUserByEmail(email);

        if (!user) {
            return res.status(401).json({ success: false, message: 'Email tidak ditemukan' });
        }

        const match = await bcrypt.compare(password, user.password_hash);
        if (!match) {
            return res.status(401).json({ success: false, message: 'Password salah' });
        }

        const employee = await db.Employee.findOne({
            where: { email },
            include: [{
                model: db.Role,
                attributes: ['role_name'],
                through: { attributes: [] }
            }]
        });

        const payload = {
            id: user.employee_id,
            email: user.email,
            name: user.name,
        };

        const secret = process.env.JWT_SECRET || 'defaultsecretkey';
        const token = jwt.sign(payload, secret, { expiresIn: '1h' });

        res.json({
            success: true,
            token,
            currentUser: employee,
            user: payload,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Terjadi kesalahan pada server' });
    }
};

module.exports = { login };
