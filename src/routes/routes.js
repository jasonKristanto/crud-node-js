const express = require('express');
const routes = express.Router();

const controller = require('../controllers/controller');

routes.post('/login', controller.login);
routes.post('/logout', controller.logout);

routes.get('/users', controller.getAllUsers);
routes.post('/user', controller.createUser);
routes.get('/user/:email', controller.getUser);
routes.put('/user/:email', controller.updateUser);
routes.delete('/user/:email', controller.deleteUser);

routes.use('/', controller.fallback);

module.exports = routes;
