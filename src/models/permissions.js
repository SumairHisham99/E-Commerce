module.exports = (sequelize, Sequelize) => {
    const DataTypes = Sequelize.DataTypes;
    const Permission = sequelize.define('permissions',  {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(20),
        allowNull: false
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
      tableName: 'permissions',
    });
  
    return Permission;
  };
  