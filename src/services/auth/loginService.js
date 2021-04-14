require('dotenv').config();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userDb = require('../../models/models');
const tokenDb = require('../../models/tokenModels');

const {sendSuccessResponse, sendFailedResponse} = require('../../helpers/responseHelpers');

module.exports = {
  loginService: async (req, res) => {
    const user = await userDb.findOne({username: req.body.username});

    if (user) {
      bcrypt.compare(req.body.password, user.password).then((isPasswordMatched) => {
        if (isPasswordMatched === true) {
          let accessTokenSecret, refreshTokenSecret;
          console.log(user);
          if (req.originalUrl === '/login/user' && user.role === 'user') {
            accessTokenSecret = process.env.USER_ACCESS_TOKEN_SECRET;
            refreshTokenSecret = process.env.USER_REFRESH_TOKEN_SECRET;
          } else if (req.originalUrl === '/login/admin' && user.role === 'admin') {
            accessTokenSecret = process.env.ADMIN_ACCESS_TOKEN_SECRET;
            refreshTokenSecret = process.env.ADMIN_REFRESH_TOKEN_SECRET;
          } else {
            accessTokenSecret = '';
            refreshTokenSecret = '';
          }

          if (accessTokenSecret.length > 0 && refreshTokenSecret.length > 0) {
            const accessToken = jwt.sign(user.toJSON(), accessTokenSecret, {expiresIn: '15s'});
            const refreshToken = jwt.sign(user.toJSON(), refreshTokenSecret);

            const token = new tokenDb({
              username: req.body.username,
              token: refreshToken
            });

            token.save();

            sendSuccessResponse(res, 'Login Successful', {
              accessToken, refreshToken
            });
          } else {
            sendFailedResponse(res, 401, 'Unauthorized')
          }
        } else {
          sendFailedResponse(res, 404, 'Username and/or password is incorrect');
        }
      });
    } else {
      sendFailedResponse(res, 404, 'Username and/or password is incorrect');
    }
  },
};
