// import admin routes
const adminSigninRoutes = require('./adminController/adminSigninRoutes');
const adminUserRoutes = require('./adminController/adminUserRoutes');
const adminProductRoutes = require('./adminController/adminProductRoutes');
const adminCategoryRoutes = require('./adminController/adminCategoryRoutes');

// import user routes
const userSigninRoutes = require('./userController/userSignin');
const userProductsRoutes = require('./userController/userProductsRoutes');

module.exports = {
    // Admin Routes
    adminSigninRoutes,
    adminUserRoutes,
    adminProductRoutes,
    adminCategoryRoutes,
    // User Routes
    userSigninRoutes,
    userProductsRoutes
}