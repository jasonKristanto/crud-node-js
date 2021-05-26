const userDb = require('../../models/models');
const { sendSuccessResult, sendFailedResult } = require('../../helpers/response-helpers');

module.exports = {
  getUserService: (req) => {
    const { username } = req.user;

    return userDb.findOne({ username })
      .then((user) => {
        if (user) {
          return sendSuccessResult('Successfully get the user.', user);
        }

        return sendFailedResult(404, 'User not found.');
      })
      .catch(() => sendFailedResult(500, 'Unsuccessfully get the users.'));
  },
};
