const express = require('express');
const controller = require('../controllers/employeeController');
const validateFile = require('../middlewares/fileValidator');
const employeeValidator = require('../validations/employeeValidator');
const verifyToken = require('../middlewares/authMiddleware');  

const router = express.Router();

router.post('/employee-create', validateFile, employeeValidator, controller.create);
router.put('/employee-update/:id', validateFile, employeeValidator, controller.update); // 👈 endpoint untuk update data
router.get('/employee/:id', controller.getById); // 👈 endpoint untuk ambil data berdasarkan ID
router.delete('/employee-delete/:id', controller.delete); // 👈 endpoint untuk hapus data
router.get('/employees', verifyToken, controller.getAll); // 👈 endpoint untuk ambil semua data

module.exports = router;
