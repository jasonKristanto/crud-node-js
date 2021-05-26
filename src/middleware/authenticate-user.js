const jwt = require('jsonwebtoken');

const { sendMiddlewareFailedResponse } = require('../helpers/response-helpers');

exports.authenticateUser = async (req, res, next) => {
  let user;
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (token) {
    try {
      if (req.originalUrl.split('/').includes('admin')) {
        user = jwt.verify(token, process.env.ADMIN_ACCESS_TOKEN_SECRET);
      } else {
        user = jwt.verify(token, process.env.USER_ACCESS_TOKEN_SECRET);
      }

      req.user = user;
      next();
    } catch (error) {
      console.log(error);
      sendMiddlewareFailedResponse(res, 403, 'Invalid token');
    }
  } else {
    sendMiddlewareFailedResponse(res, 401, 'Invalid token');
  }
};
