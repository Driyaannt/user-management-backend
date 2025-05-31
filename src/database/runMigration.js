const db = require('./index');
const fs = require('fs');
const path = require('path');

async function runMigration() {
  const sqlPath = path.join(__dirname, 'migrations.sql');
  const sql = fs.readFileSync(sqlPath, 'utf-8');

  try {
    await db.sequelize.query(sql);
    console.log('Migrasi berhasil dijalankan!');
  } catch (err) {
    console.error('Gagal menjalankan migrasi:', err);
  } finally {
    await db.sequelize.close();
  }
}

runMigration();
