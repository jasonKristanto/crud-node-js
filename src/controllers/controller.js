const {sendSuccessResponse, sendFailedResponse} = require('../helpers/responseHelpers');

const services = require('../services/services');

exports.login = (req, res) => {
  console.log(req);
  console.log(res);
  sendSuccessResponse(res, 'hello login');
};

exports.logout = (req, res) => {
  sendSuccessResponse(res, 'hello logout');
};

exports.getAllUsers = (req, res) => {
  services.userServices.getAllUsersService(req, res);
};

exports.getUser = (req, res) => {
  services.userServices.getUserService(req, res);
};

exports.deleteUser = (req, res) => {
  services.userServices.deleteUserService(req, res);
};

exports.createUser = async (req, res) => {
  await services.userServices.createUserService(req, res);
};

exports.updateUser = async (req, res) => {
  await services.userServices.updateUserService(req, res);
};

exports.fallback = (req, res) => {
  sendFailedResponse(res, 404, 'Page Not Found');
};
