const services = require('../services/services');
const {sendFailedResponse} = require('../helpers/responseHelpers');

exports.login = async (req, res) => {
  await services.authServices.loginService(req, res);
};

exports.logout = async (req, res) => {
  await services.authServices.logoutService(req, res);
};

exports.refreshToken = async (req, res) => {
  await services.authServices.refreshTokenService(req, res);
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
