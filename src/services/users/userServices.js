const {createUserService} = require('./createUserService');
const {getAllUsersService} = require('./getAllUsersService');
const {getUserService} = require('./getUserService');
const {deleteUserService} = require('./deleteUserService');
const {updateUserService} = require('./updateUserService');

module.exports = {
  createUserService,
  getAllUsersService,
  getUserService,
  deleteUserService,
  updateUserService,
};
