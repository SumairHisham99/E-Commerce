const { UserModel, RoleModel, PermissionModel } = require('../models');

const authorization = (requiredRole) => {
    return async (req, res, next) => {
      try {
        // Retrieve user's authorization information
        const userId = req.user.user_id;
        const api = req.route.path;
  
        // Retrieve user's role and related permissions from the database
        const user = await UserModel.findByPk(userId, {
          include: [
            {
              model: RoleModel,
              include: [
                {
                  model: PermissionModel
                }
              ],
            },
          ],
        });
  
        const userRole = user.role.name;
        const userPermissions = user.role.permissions.map(permission => permission.name);
        
        // Check user role and permissions
        if (userRole === requiredRole) {
          if (userPermissions.includes(api)) {
            next();
          } else {
            res.status(403).json({ message: 'Forbidden' });
          }
        } else {
          res.status(403).json({ message: 'Forbidden' });
        }
  
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    };
  };

module.exports = {
    authorization
}