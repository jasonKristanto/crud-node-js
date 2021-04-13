const {sendSuccessResponse, sendFailedResponse} = require('../../helpers/responseHelpers');

const userDb = require('../../models/models');

module.exports = {
  deleteUserService: (req, res) => {
    userDb.deleteOne({email: req.params.email})
      .then(data => {
        if (data.deletedCount > 0) {
          sendSuccessResponse(res, 'Successfully deleted user.');
        } else {
          sendFailedResponse(res, 404, 'User not found');
        }
      })
      .catch(err => {
        console.log(err);
        sendFailedResponse(res, 500, 'Unsuccessfully deleted user.');
      });
  },
};
