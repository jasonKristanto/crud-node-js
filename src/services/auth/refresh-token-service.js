require('dotenv').config();

const jwt = require('jsonwebtoken');

const { sendSuccessResult, sendFailedResult } = require('../../helpers/response-helpers');

module.exports = {
  refreshTokenService: async (req) => {
    let accessTokenSecret;

    if (req.user.role === 'user') {
      accessTokenSecret = process.env.USER_ACCESS_TOKEN_SECRET;
    } else if (req.user.role === 'admin') {
      accessTokenSecret = process.env.ADMIN_ACCESS_TOKEN_SECRET;
    } else {
      accessTokenSecret = '';
    }

    if (accessTokenSecret.length > 0) {
      const user = {
        username: req.user.username,
        password: req.user.password,
        email: req.user.email,
        gender: req.user.gender,
        phoneNumber: req.user.phoneNumber,
        role: req.user.role,
      };

      const accessToken = await jwt.sign(user, accessTokenSecret, { expiresIn: '15m' });

      return sendSuccessResult('Token Refreshed Successfully', {
        accessToken,
      });
    }

    return sendFailedResult(401, 'Unauthorized');
  },
};
