const {sendFailedResponse} = require('../helpers/responseHelpers');

const jwt = require('jsonwebtoken');

exports.authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    sendFailedResponse(res, 401, 'Invalid token');
  } else {
    jwt.verify(token, process.env.USER_ACCESS_TOKEN_SECRET, (err, user) => {
      console.log(err)
      if (!err) {
        req.user = user;
        next();
      } else {
        sendFailedResponse(res, 403, 'Invalid token');
      }
    });
  }
};
