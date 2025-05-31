module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Employee', {
        employee_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        identity_number: { type: DataTypes.STRING(50), unique: true, allowNull: false },
        name: { type: DataTypes.STRING(100), allowNull: false },
        gender: { type: DataTypes.ENUM('Laki-laki', 'Perempuan'), allowNull: false },
        birth_place: { type: DataTypes.STRING(100), allowNull: false },
        birth_date: { type: DataTypes.DATEONLY, allowNull: false },
        province: DataTypes.STRING(100),
        city: DataTypes.STRING(100),
        district: DataTypes.STRING(100),
        village: DataTypes.STRING(100),
        address_detail: DataTypes.TEXT,
        phone_number: DataTypes.STRING(20),
        email: { type: DataTypes.STRING(100), unique: true, allowNull: false },
        username: { type: DataTypes.STRING(50), unique: true, allowNull: false },
        password_hash: { type: DataTypes.STRING(255), allowNull: false },
        contract_start_date: { type: DataTypes.DATEONLY, allowNull: false },
        contract_end_date: { type: DataTypes.DATEONLY, allowNull: false },
        marital_status: { type: DataTypes.ENUM('Belum Menikah', 'Menikah', 'Cerai') },
        created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        status: { type: DataTypes.ENUM('Aktif', 'Tidak Aktif'), defaultValue: 'Aktif' },
    }, {
        tableName: 'employees',
        timestamps: false,
    });
};
