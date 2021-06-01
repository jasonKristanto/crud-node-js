const userDb = require('../../models/models');
const tokenDb = require('../../models/token-models');
const { sendSuccessResult, sendFailedResult } = require('../../helpers/response-helpers');

module.exports = {
  deleteUserService: async (req) => {
    const { username } = req.body;

    return tokenDb.deleteMany({ username }).then(() => userDb.deleteOne({ username })
      .then((data) => {
        if (data.deletedCount > 0) {
          return sendSuccessResult('successfully deleted user.');
        }

        return sendFailedResult(404, 'User not found');
      })).catch((err) => {
      console.log(err);
      return sendFailedResult(500, 'Unsuccessfully deleted user.');
    });
  },
};
