const services = require('../services/services');
const { sendResponse } = require('../helpers/response-helpers');

exports.login = async (req, res) => {
  const result = await services.authServices.loginService(req);

  sendResponse(res, result);
};

exports.logout = async (req, res) => {
  const result = await services.authServices.logoutService(req);

  sendResponse(res, result);
};

exports.refreshToken = async (req, res) => {
  const result = await services.authServices.refreshTokenService(req);

  sendResponse(res, result);
};

exports.getAllUsers = async (req, res) => {
  const result = await services.userServices.getAllUsersService();

  sendResponse(res, result);
};

exports.getUser = async (req, res) => {
  const result = await services.userServices.getUserService(req);

  sendResponse(res, result);
};

exports.deleteUser = async (req, res) => {
  const result = await services.userServices.deleteUserService(req);

  sendResponse(res, result);
};

exports.createUser = async (req, res) => {
  const result = await services.userServices.createUserService(req);

  sendResponse(res, result);
};

exports.updateUser = async (req, res) => {
  const result = await services.userServices.updateUserService(req);

  sendResponse(res, result);
};

exports.fallback = (req, res) => {
  sendResponse(res, {
    statusCode: 404,
    message: 'Page Not Found',
    data: [],
  });
};
