const express = require('express');

const routes = express.Router();

const controller = require('../controllers/controller');
const { authenticateUser } = require('../middleware/authenticate-user');
const { authenticateToken } = require('../middleware/authenticate-token');

/* Admin Routes */
routes.post('/admin/login', controller.login);

routes.post('/admin/token', authenticateToken, controller.refreshToken);
routes.post('/admin/logout', authenticateToken, controller.logout);

routes.get('/admin/users', authenticateUser, controller.getAllUsers);
routes.post('/admin/user', authenticateUser, controller.createUser);
routes.put('/admin/user', authenticateUser, controller.updateUser);
routes.delete('/admin/user', authenticateUser, controller.deleteUser);
routes.get('/admin/user', authenticateUser, controller.getUser);

/* User Routes */
routes.post('/user/login', controller.login);

routes.post('/user/token', authenticateToken, controller.refreshToken);
routes.post('/user/logout', authenticateToken, controller.logout);

routes.get('/user', authenticateUser, controller.getUser);

routes.use('/', controller.fallback);

module.exports = routes;
