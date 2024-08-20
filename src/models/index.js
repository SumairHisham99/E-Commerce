const { sequelize, Sequelize } = require('../dbconfig/dbConn')
const User = require('./user');
const Product = require('./product');
const Category = require('./category');
const Role = require('./role');
const Permission = require('./permissions');
const RolePermission = require('./role_permissions');

// Initializing Models
const UserModel = User(sequelize, Sequelize);
const ProductModel = Product(sequelize, Sequelize)
const CategoryModel = Category(sequelize, Sequelize)
const RoleModel = Role(sequelize, Sequelize)
const PermissionModel = Permission(sequelize, Sequelize)
const RolePermissionModel = RolePermission(sequelize, Sequelize)

// Define Associations here
RoleModel.hasMany(UserModel, {
  foreignKey: 'roleId'
})
UserModel.belongsTo(RoleModel);
CategoryModel.hasMany(ProductModel, {
  foreignKey: 'categoryId'
});
ProductModel.belongsTo(CategoryModel);

RoleModel.belongsToMany(PermissionModel, { through: RolePermissionModel });
PermissionModel.belongsToMany(RoleModel, { through: RolePermissionModel });


(async () => {
  try {
    // Sync the models with the database
    await sequelize.sync({ alter: true });
    console.log('Database synchronized');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
})();

// Export the models
module.exports = {
  UserModel,
  ProductModel,
  CategoryModel,
  RoleModel,
  PermissionModel,

};
