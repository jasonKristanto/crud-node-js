const jwt = require('jsonwebtoken');

const tokenDb = require('../models/token-models');
const { sendMiddlewareFailedResponse } = require('../helpers/response-helpers');

exports.authenticateToken = async (req, res, next) => {
  let user;
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  const isUserTokenExists = await tokenDb.exists({
    token,
  });

  if (token && isUserTokenExists) {
    try {
      if (req.originalUrl.split('/').includes('admin')) {
        user = jwt.verify(token, process.env.ADMIN_REFRESH_TOKEN_SECRET);
      } else {
        user = jwt.verify(token, process.env.USER_REFRESH_TOKEN_SECRET);
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
