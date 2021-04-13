const {sendSuccessResponse, sendFailedResponse} = require('../../helpers/responseHelpers');

const userDb = require('../../models/models');

module.exports = {
  getAllUsersService: (req, res) => {
    userDb.find()
      .then(user => {
        sendSuccessResponse(res, 'Successfully get all users.', user);
      })
      .catch(e => {
        console.log(e);
        sendFailedResponse(res, 500, 'Unsuccessfully get all users.');
      });
  },
};
