const { getById } = require('../controllers/employeeController');
const { Employee } = require('../domain/employee');
const { Role } = require('../domain/role');
const { update } = require('../usecases/employeeUseCase');

const EmployeeRepository = {
  async create(employeeData) {
    const employee = await Employee.create(employeeData);

    if (employeeData.role && Array.isArray(employeeData.role)) {
      const roles = await Role.findAll({
        where: { role_name: employeeData.role }
      });
      await employee.setRoles(roles);
    }

    return employee;
  },

  async getById(id) {
    const employee = await Employee.findByPk(id, {
      include: [
        {
          model: Role,
          as: 'roles',
          attributes: ['role_id', 'role_name'],
          through: { attributes: [] }
        }
      ]
    });

    if (!employee) {
      throw new Error('Employee not found');
    }

    return employee;
  },

  async update(id, employeeData) {
    const employee = await Employee.findByPk(id);
    if (!employee) {
      throw new Error('Employee not found');
    }

    const { role, password_hash, ...updateData } = employeeData;

    if (password_hash) {
      const saltRounds = 10;
      updateData.password_hash = await bcrypt.hash(password_hash, saltRounds);
    }

    await employee.update(updateData);

    if (role && Array.isArray(role)) {
      const roles = await Role.findAll({
        where: { role_name: role }
      });
      await employee.setRoles(roles);
    }

    return employee;
  },

  async getAll() {
    return await Employee.findAll({
      include: [
        {
          model: Role,
          as: 'roles',
          attributes: ['role_id', 'role_name'],
          through: { attributes: [] }
        }
      ]
    });
  }
};

module.exports = EmployeeRepository;
