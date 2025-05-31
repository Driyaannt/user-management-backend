const { validationResult } = require('express-validator');
const EmployeeUseCase = require('../usecases/employeeUseCase');

const employeeController = {
    async create(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const result = await EmployeeUseCase.create(req.body);
            res.status(201).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async delete(req, res) {
        const { id } = req.params;
        try {
            await EmployeeUseCase.delete(id);
            res.status(204).send();
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async getById(req, res) {
        const { id } = req.params;
        try {
            const employee = await EmployeeUseCase.getById(id);
            if (!employee) {
                return res.status(404).json({ error: 'Employee not found' });
            }
            res.json(employee);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
   
    async update(req, res) {
        const { id } = req.params;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const updatedEmployee = await EmployeeUseCase.update(id, req.body);
            res.json(updatedEmployee);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async getAll(req, res) {
        try {
            const employees = await EmployeeUseCase.getAll();
            res.json(employees);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
};

module.exports = employeeController;
