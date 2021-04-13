const {sendSuccessResponse, sendFailedResponse} = require('../../helpers/responseHelpers');

const userDb = require('../../models/models');

module.exports = {
  getUserService: (req, res) => {
    userDb.findOne({email: req.params.email})
      .then(user => {
        if (user) {
          sendSuccessResponse(res, 'Successfully get the user.', user);
        } else {
          sendFailedResponse(res, 404, 'User not found.');
        }
      })
      .catch(e => {
        console.log(e);
        sendFailedResponse(res, 500, 'Unsuccessfully get the users.');
      });
  },
};
