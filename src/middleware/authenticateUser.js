const {sendFailedResponse} = require('../helpers/responseHelpers');

const jwt = require('jsonwebtoken');
const tokenDb = require('../models/tokenModels');

exports.authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  const isUserTokenExists = await tokenDb.exists({
    token: token
  });

  if (!token || !isUserTokenExists) {
    sendFailedResponse(res, 401, 'Invalid token');
  } else {
    jwt.verify(token, process.env.USER_ACCESS_TOKEN_SECRET, (err, user) => {
      if (!err) {
        req.user = user;
        next();
      } else {
        jwt.verify(token, process.env.ADMIN_ACCESS_TOKEN_SECRET, (err, user) => {
          if (!err) {
            req.user = user;
            next();
          } else {
            sendFailedResponse(res, 403, 'Invalid token');
          }
        });
      }
    });
  }
};
