const express = require('express');
const routes = express.Router();

const controller = require('../controllers/controller');
const {authenticateToken} = require('../middleware/authenticateUser');
const {authenticateAdminToken} = require('../middleware/authenticateAdmin');

routes.post('/login/user', controller.login);
routes.post('/login/admin', controller.login);

routes.get('/users', authenticateAdminToken, controller.getAllUsers);
routes.post('/user', authenticateAdminToken, controller.createUser);
routes.put('/user', authenticateAdminToken, controller.updateUser);
routes.delete('/user', authenticateAdminToken, controller.deleteUser);

routes.post('/logout', authenticateToken, controller.logout);
routes.get('/user', authenticateToken, controller.getUser);

routes.use('/', controller.fallback);

module.exports = routes;
