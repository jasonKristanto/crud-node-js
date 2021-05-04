const express = require('express');
const routes = express.Router();

const controller = require('../controllers/controller');
const {authenticateToken} = require('../middleware/authenticateUser');
const {authenticateRefreshToken} = require('../middleware/authenticateRefreshToken');
const {authenticateAdminToken} = require('../middleware/authenticateAdmin');
const {authenticateAdminRefreshToken} = require('../middleware/authenticateAdminRefreshToken');

/* Admin Routes */
routes.post('/admin/login', controller.login);
routes.post('/admin/token', authenticateAdminRefreshToken, controller.refreshToken);
routes.post('/admin/logout', authenticateRefreshToken, controller.logout);
routes.get('/admin/users', authenticateAdminToken, controller.getAllUsers);
routes.post('/admin/user', authenticateAdminToken, controller.createUser);
routes.put('/admin/user', authenticateAdminToken, controller.updateUser);
routes.delete('/admin/user', authenticateAdminToken, controller.deleteUser);
routes.get('/admin/user', authenticateAdminToken, controller.getUser);


/* User Routes */
routes.post('/user/login', controller.login);
routes.post('/user/token', authenticateRefreshToken, controller.refreshToken);
routes.post('/user/logout', authenticateRefreshToken, controller.logout);
routes.get('/user', authenticateToken, controller.getUser);

routes.use('/', controller.fallback);

module.exports = routes;
