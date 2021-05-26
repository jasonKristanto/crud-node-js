const tokenDb = require('../../models/token-models');
const { sendSuccessResult, sendFailedResult } = require('../../helpers/response-helpers');

module.exports = {
  logoutService: async (req) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    const isUserTokenExists = await tokenDb.exists({
      token,
    });

    if (isUserTokenExists) {
      return tokenDb.deleteMany({
        username: req.user.username,
      }).then((data) => {
        if (data.deletedCount > 0) {
          return sendSuccessResult('Logout successfully.');
        }

        return sendFailedResult(404, 'Unauthorized');
      }).catch((error) => {
        console.log(error);
        return sendFailedResult(500, 'Unsuccessfully logged out.');
      });
    }

    return sendFailedResult(401, 'Unauthorized');
  },
};
