require('dotenv').config();

const jwt = require('jsonwebtoken');

const {sendSuccessResponse, sendFailedResponse} = require('../../helpers/responseHelpers');

module.exports = {
  refreshTokenService: async (req, res) => {
    let accessTokenSecret;
    if (req.user.role === 'user') {
      console.log('refresh for user')
      accessTokenSecret = process.env.USER_ACCESS_TOKEN_SECRET;
    } else if (req.user.role === 'admin') {
      console.log('refresh for admin')
      accessTokenSecret = process.env.ADMIN_ACCESS_TOKEN_SECRET;
    } else {
      console.log('refresh for no one')
      accessTokenSecret = '';
    }

    console.log(req.user);
    console.log(typeof req.user);

    if (accessTokenSecret.length > 0) {
      const user = {
        username: req.user.username,
        password: req.user.password,
        email: req.user.email,
        gender: req.user.gender,
        phoneNumber: req.user.phoneNumber,
        role: req.user.role,
      };

      const accessToken = await jwt.sign(user, accessTokenSecret, {expiresIn: '15s'});
      sendSuccessResponse(res, 'Token Refreshed Successfully', {
        accessToken
      });
    } else {
      sendFailedResponse(res, 401, 'Unauthorized');
    }
  },
};
