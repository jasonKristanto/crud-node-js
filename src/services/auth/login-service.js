require('dotenv').config();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserDb = require('../../models/models');
const TokenDb = require('../../models/token-models');

const { sendSuccessResult, sendFailedResult } = require('../../helpers/response-helpers');

module.exports = {
  loginService: async (req) => {
    const { username, password } = req.body;
    const user = await UserDb.findOne({ username });

    if (user) {
      return bcrypt.compare(password, user.password).then((isPasswordMatched) => {
        if (isPasswordMatched === true) {
          let accessTokenSecret;
          let refreshTokenSecret;

          if (req.originalUrl === '/user/login' && user.role === 'user') {
            accessTokenSecret = process.env.USER_ACCESS_TOKEN_SECRET;
            refreshTokenSecret = process.env.USER_REFRESH_TOKEN_SECRET;
          } else if (req.originalUrl === '/admin/login' && user.role === 'admin') {
            accessTokenSecret = process.env.ADMIN_ACCESS_TOKEN_SECRET;
            refreshTokenSecret = process.env.ADMIN_REFRESH_TOKEN_SECRET;
          } else {
            accessTokenSecret = '';
            refreshTokenSecret = '';
          }

          if (accessTokenSecret.length > 0 && refreshTokenSecret.length > 0) {
            const accessToken = jwt.sign(user.toJSON(), accessTokenSecret, { expiresIn: '15m' });
            const refreshToken = jwt.sign(user.toJSON(), refreshTokenSecret);

            const token = new TokenDb({
              username,
              token: refreshToken,
            });

            token.save();

            return sendSuccessResult('Login Successful', { accessToken, refreshToken });
          }

          return sendFailedResult(401, 'Unauthorized');
        }

        return sendFailedResult(404, 'Username and/or password is incorrect');
      });
    }

    return sendFailedResult(404, 'Username and/or password is incorrect');
  },
};
