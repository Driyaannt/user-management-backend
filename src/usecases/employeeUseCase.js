const db = require('../database');
const Employee = require('../domain/employee');
const bcrypt = require('bcrypt');

const EmployeeUseCase = {
    async create(data) {
        const transaction = await db.sequelize.transaction();

        try {
            const saltRounds = 10;

            const { role, password_hash, ...employeeData } = data;

            if (!password_hash) {
                throw new Error("Password is required");
            }

            if (!role || !Array.isArray(role) || role.length === 0) {
                throw new Error("Roles must be a non-empty array");
            }

            const filteredRoles = role.filter(r => typeof r === 'string' && r.trim() !== '');
            if (filteredRoles.length === 0) {
                throw new Error("Roles array must contain valid role names");
            }

            const hashedPassword = await bcrypt.hash(password_hash, saltRounds);

            console.log("Creating employee...");
            const employee = await db.Employee.create(
                { ...employeeData, password_hash: hashedPassword },
                { transaction }
            );

            console.log("Finding roles in DB:", filteredRoles);

            // Cek roles yang sudah ada
            const existingRoles = await db.Role.findAll({
                where: { role_name: filteredRoles },
                transaction,
            });

            const existingRoleNames = existingRoles.map(r => r.role_name);

            // Cari roles yang belum ada
            const newRoles = filteredRoles.filter(r => !existingRoleNames.includes(r));

            console.log("New roles to create:", newRoles);

            // Buat role baru di DB (master role)
            for (const newRoleName of newRoles) {
                await db.Role.create({ role_name: newRoleName }, { transaction });
            }

            // Query ulang semua roles lengkap (existing + baru)
            const rolesFound = await db.Role.findAll({
                where: { role_name: filteredRoles },
                transaction,
            });

            console.log("Roles found after insert:", rolesFound.map(r => r.toJSON()));

            await employee.setRoles(rolesFound, { transaction });
            console.log("Roles successfully set for employee.");

            await transaction.commit();
            console.log("Transaction committed.");

            const employeeWithRoles = await db.Employee.findByPk(employee.employee_id, {
                include: [{
                    model: db.Role,
                    through: { attributes: [] }
                }]
            });

            return employeeWithRoles;

        } catch (error) {
            await transaction.rollback();
            console.error("CREATE EMPLOYEE ERROR:", error);
            throw error;
        }
    },

    async getById(employee_id) {
        const employee = await db.Employee.findByPk(employee_id, {
            include: [{
                model: db.Role,
                through: { attributes: [] }
            }]
        });

        if (!employee) {
            throw new Error('Employee not found');
        }

        return employee;
    },

    async update(employee_id, data) {
        const transaction = await db.sequelize.transaction();

        try {
            const employee = await db.Employee.findByPk(employee_id, { transaction });

            if (!employee) {
                throw new Error('Employee not found');
            }

            const { role, password_hash, ...updateData } = data;

            if (password_hash) {
                const saltRounds = 10;
                updateData.password_hash = await bcrypt.hash(password_hash, saltRounds);
            }

            await employee.update(updateData, { transaction });

            if (role && Array.isArray(role) && role.length > 0) {
                const filteredRoles = role.filter(r => typeof r === 'string' && r.trim() !== '');
                if (filteredRoles.length === 0) {
                    throw new Error("Roles array must contain valid role names");
                }

                const existingRoles = await db.Role.findAll({
                    where: { role_name: filteredRoles },
                    transaction,
                });

                const existingRoleNames = existingRoles.map(r => r.role_name);

                const newRoles = filteredRoles.filter(r => !existingRoleNames.includes(r));

                for (const newRoleName of newRoles) {
                    await db.Role.create({ role_name: newRoleName }, { transaction });
                }

                const rolesFound = await db.Role.findAll({
                    where: { role_name: filteredRoles },
                    transaction,
                });

                await employee.setRoles(rolesFound, { transaction });
            }

            await transaction.commit();
            console.log('Employee updated successfully.');

            return employee;

        } catch (error) {
            await transaction.rollback();
            console.error('UPDATE EMPLOYEE ERROR:', error);
            throw error;
        }
    },

    async delete(employee_id) {
        const transaction = await db.sequelize.transaction();

        try {
            const employee = await db.Employee.findByPk(employee_id, { transaction });

            if (!employee) {
                throw new Error('Employee not found');
            }

            // Hapus relasi dari tabel pivot (many-to-many)
            await employee.setRoles([], { transaction });

            // Hapus employee dari tabel utama
            await employee.destroy({ transaction });

            await transaction.commit();
            console.log('Employee deleted successfully.');

            return { message: 'Employee deleted successfully' };
        } catch (error) {
            await transaction.rollback();
            console.error('DELETE EMPLOYEE ERROR:', error);
            throw error;
        }
    },

    async getAll() {
        const employees = await db.Employee.findAll({
            include: [{
                model: db.Role,
                through: { attributes: [] }
            }]
        });
        return employees;
    }
};

module.exports = EmployeeUseCase;
