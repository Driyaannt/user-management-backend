// src/database/seeder.js
const db = require('./index');

async function seed() {
  try {
    // Jangan sync dengan alter agar tidak terjadi konflik enum
    // await db.sequelize.sync({ alter: true }); // HAPUS INI kalau sudah pakai SQL migration manual

    // ✅ Seed roles
    const roleNames = [
      'Manager',
      'Resepsionis',
      'Manajemen',
      'Finance',
      'Kasir',
      'Purchasing',
      'Perawat',
      'Bidan',
      'Dokter',
      'Lainnya'
    ];

    const roleInstances = [];
    for (const name of roleNames) {
      const [role] = await db.Role.findOrCreate({
        where: { role_name: name },
      });
      roleInstances.push(role);
    }

    console.log('✅ Roles seeded');

    // ✅ Seed one employee
    const employee = await db.Employee.create({
      identity_number: '9876543210',
      name: 'Siti Aminah',
      gender: 'Perempuan', // Harus sesuai enum di SQL (gender_type)
      birth_place: 'Bandung',
      birth_date: '1985-08-15',
      province: 'Jawa Barat',
      city: 'Bandung',
      district: 'Coblong',
      village: 'Dago',
      address_detail: 'Jl. Merdeka No.10',
      phone_number: '089876543210',
      email: 'siti@example.com',
      username: 'siti85',
      password_hash: '$2a$12$iTTO9PzVeUANjjpqYaacG.pkAWx3GP..6pMhX7DI4qVUoX3gS/BLi',
      contract_start_date: '2023-02-01',
      contract_end_date: '2024-02-01',
      marital_status: 'Belum Menikah', // Harus sesuai enum di SQL (marital_status_type)
      status: 'Aktif',
    });

    // ✅ Assign roles to employee
    const rolesToAssign = ['Perawat', 'Lainnya'];
    const assignedRoles = await db.Role.findAll({
      where: { role_name: rolesToAssign },
    });

    await employee.setRoles(assignedRoles);

    console.log('✅ Employee and roles assigned');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  }
}

seed();