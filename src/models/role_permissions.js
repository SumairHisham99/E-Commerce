module.exports = (sequelize, Sequelize) => {
    const DataTypes = Sequelize.DataTypes;
    const Role_Permission = sequelize.define('role_permissions',  {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'role',
            key: 'id'
        }
      },
      permissionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'permissions',
            key: 'id'
        }
      },
      enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      deleted: {
          type: DataTypes.BOOLEAN,
          defaultValue: false
      }
    },
    {
      underscored: true,
      freezeTableName: true,
      timestamps: false,
      // define the table's name
      tableName: 'role_permissions',
    });
  
    return Role_Permission;
  };
  