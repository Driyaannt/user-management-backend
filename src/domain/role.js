module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define('Role', {
        role_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        role_name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
    }, {
        tableName: 'roles',
        timestamps: false,  // tidak ada created_at dan updated_at di tabel roles
    });

    return Role;
};
