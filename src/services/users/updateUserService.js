const {sendSuccessResponse, sendFailedResponse} = require('../../helpers/responseHelpers');
const {validateUserRequest} = require('../../requests/requests');

const bcrypt = require('bcryptjs');
const userDb = require('../../models/models');

module.exports = {
  updateUserService: async (req, res) => {
    console.log(req.body);
    if (validateUserRequest(req)) {
      const isRequestedUserExists  = await userDb.exists({username: req.body.username});

      if (isRequestedUserExists) {
        bcrypt.genSalt(10, function(err, salt) {
          if (!err) {
            bcrypt.hash(req.body.password, salt, function(err, hash) {
              if (!err) {
                const user = {
                  username: req.body.username,
                  password: hash,
                  email: req.body.email,
                  gender: req.body.gender,
                  phoneNumber: req.body.phoneNumber,
                  role: req.body.role ? req.body.role : 'user',
                };

                userDb.updateOne({username: req.body.username}, user, {useFindAndModify: false})
                  .then(data => {
                    console.log(data);
                    sendSuccessResponse(res, 'Successfully updated user.');
                  })
                  .catch(e => {
                    console.log(e);
                    sendFailedResponse(res, 500, 'Unsuccessfully updated user.');
                  });
              } else {
                sendFailedResponse(res, 500, 'Unsuccessfully created new user.');
              }
            });
          } else {
            sendFailedResponse(res, 500, 'Unsuccessfully created new user.');
          }
        });
      } else {
        sendFailedResponse(res, 400, 'Users is not found and/or New Username is already exists.');
      }
    } else {
      sendFailedResponse(res, 400, 'Invalid data request.');
    }
  },
};
