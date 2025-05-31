const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.Employee = require('../domain/employee')(sequelize, DataTypes);
db.Role = require('../domain/role')(sequelize, DataTypes); // kalau ada

// kalau relasi:
db.Employee.belongsToMany(db.Role, { through: 'employee_roles', timestamps: false, foreignKey: 'employee_id' });
db.Role.belongsToMany(db.Employee, { through: 'employee_roles', timestamps: false, foreignKey: 'role_id' });

module.exports = db;
