const {sendSuccessResponse, sendFailedResponse} = require('../../helpers/responseHelpers');
const {validateUserRequest} = require('../../requests/requests');

const userDb = require('../../models/models');

module.exports = {
  updateUserService: async (req, res) => {
    console.log(req.body);
    if (validateUserRequest(req)) {
      const isRequestedUserExists  = await userDb.exists({email: req.params.email});
      const isNewEmailDuplicated = await userDb.exists({email: req.body.email});

      if (isRequestedUserExists && !isNewEmailDuplicated) {
        userDb.updateOne({email: req.params.email}, req.body, {useFindAndModify: false})
          .then(data => {
            console.log(data);
            sendSuccessResponse(res, 'Successfully updated user.');
          })
          .catch(e => {
            console.log(e);
            sendFailedResponse(res, 500, 'Unsuccessfully updated user.');
          });
      } else {
        sendFailedResponse(res, 400, 'Users is not found and/or New Email is duplicated.');
      }
    } else {
      sendFailedResponse(res, 400, 'Invalid data request.');
    }
  },
};
