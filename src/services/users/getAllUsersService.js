const {sendSuccessResponse, sendFailedResponse} = require('../../helpers/responseHelpers');

const userDb = require('../../models/models');

module.exports = {
  getAllUsersService: (req, res) => {
    userDb.find()
      .then(user => {
        if (user.length > 0) {
          sendSuccessResponse(res, 'Successfully get all users.', user);
        } else {
          sendFailedResponse(res, 404, 'There aren\'t any data');
        }
      })
      .catch(e => {
        console.log(e);
        sendFailedResponse(res, 500, 'Unsuccessfully get all users.');
      });
  },
};
