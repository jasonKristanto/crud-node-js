const {sendSuccessResponse, sendFailedResponse} = require('../../helpers/responseHelpers');
const {validateUserRequest} = require('../../requests/requests');

const userDb = require('../../models/models');

module.exports = {
  createUserService: async (req, res) => {
    console.log(req.body);
    if (validateUserRequest(req)) {
      const isNewEmailDuplicated = await userDb.exists({email: req.body.email});

      if (!isNewEmailDuplicated) {
        const user = new userDb({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          gender: req.body.gender,
          phoneNumber: req.body.phoneNumber,
        });

        user
          .save(user)
          .then(data => {
            console.log(data);
            sendSuccessResponse(res, 'Successfully created new user.');
          })
          .catch(err => {
            console.log(err);
            sendFailedResponse(res, 500, 'Unsuccessfully created new user.');
          });
      } else {
        sendFailedResponse(res, 400, 'New Email is duplicated.');
      }
    } else {
      sendFailedResponse(res, 400, 'Invalid data request.');
    }
  },
};
