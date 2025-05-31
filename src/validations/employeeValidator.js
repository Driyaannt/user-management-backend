const { body } = require('express-validator');

// const validRoles = [
//     'Manager', 'Admin', 'Revegabinis', 'Unbrojeneni',
//     'Thensec', 'Keat', 'Purchasing', 'Resepsionis',
//     'Manajemen', 'Finance', 'Kasir', 'Perawat', 'Bidan',
//     'Dokter', 'other'
// ];

const employeeValidator = [
    body('name').notEmpty().withMessage('Nama lengkap wajib diisi'),
    body('identity_number').notEmpty().withMessage('No. Kartu Identitas wajib diisi'),
    body('gender').isIn(['Laki-laki', 'Perempuan']).withMessage('Jenis kelamin tidak valid'),
    body('birth_place'),
    body('birth_date'),

    body('province'),
    body('city'),
    body('district'),
    body('village'),
    body('address_detail'),

    body('phone_number').matches(/^[0-9]{10,15}$/).withMessage('No. telepon tidak valid'),
    body('email').isEmail().withMessage('Email tidak valid'),
    body('username').isLength({ min: 4 }).withMessage('Username minimal 4 karakter'),
    body('password_hash').isLength({ min: 6 }).withMessage('Password minimal 6 karakter'),

    body('role').isArray({ min: 1 }).withMessage('Setidaknya satu role harus dipilih'),

    body('contract_start_date').isISO8601().withMessage('Tanggal mulai kontrak tidak valid'),
    body('contract_end_date').isISO8601().withMessage('Tanggal selesai kontrak tidak valid'),

    body('marital_status').isIn(['Belum Menikah', 'Menikah', 'Cerai']).withMessage('Status menikah tidak valid'),
    body('status').isIn(['Aktif', 'Tidak Aktif']).withMessage('Status tidak valid'),
];

module.exports = employeeValidator;
