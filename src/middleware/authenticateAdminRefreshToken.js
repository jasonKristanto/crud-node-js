const {sendFailedResponse} = require('../helpers/responseHelpers');

const jwt = require('jsonwebtoken');
const tokenDb = require('../models/tokenModels');

exports.authenticateAdminRefreshToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  const isUserTokenExists = await tokenDb.exists({
    token: token
  });

  if (!token || !isUserTokenExists) {
    sendFailedResponse(res, 401, 'Invalid token');
  } else {
    jwt.verify(token, process.env.ADMIN_REFRESH_TOKEN_SECRET, (err, admin) => {
      if (!err) {
        req.user = admin;
        next();
      } else {
        sendFailedResponse(res, 403, 'Invalid token');
      }
    });
  }
};
