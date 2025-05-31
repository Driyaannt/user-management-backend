const { Employee } = require('../database');

async function findUserByEmail(email) {
    return await Employee.findOne({ where: { email } });
}

module.exports = { findUserByEmail };
