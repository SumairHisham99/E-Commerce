module.exports = (sequelize, Sequelize) => {
    const DataTypes = Sequelize.DataTypes;
    const Role = sequelize.define('role',  {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(20),
        allowNull: false
      }
    },
    {
      underscored: true,
      freezeTableName: true,
      timestamps: false,
      // define the table's name
      tableName: 'role',
    });
  
    return Role;
  };
  