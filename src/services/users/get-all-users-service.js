const userDb = require('../../models/models');
const { sendSuccessResult, sendFailedResult } = require('../../helpers/response-helpers');

module.exports = {
  getAllUsersService: async () => userDb.find()
    .then((user) => {
      if (user.length > 0) {
        return sendSuccessResult('Successfully get all users.', user);
      }

      return sendFailedResult(404, 'There aren\'t any data');
    })
    .catch((error) => {
      console.log(error);
      return sendFailedResult(500, 'Unsuccessfully get all users.');
    }),
};
