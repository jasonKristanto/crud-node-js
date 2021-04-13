const {sendSuccessResponse, sendFailedResponse} = require('../../helpers/responseHelpers');
const {validateUserRequest} = require('../../requests/requests');

const bcrypt = require('bcryptjs');
const userDb = require('../../models/models');

module.exports = {
  createUserService: async (req, res) => {
    console.log(req.body);
    if (validateUserRequest(req)) {
      const isUserExists = await userDb.exists({username: req.body.username});
      if (!isUserExists) {
        bcrypt.genSalt(10, function(err, salt) {
          if (!err) {
            bcrypt.hash(req.body.password, salt, function(err, hash) {
              if (!err) {
                const user = new userDb({
                  username: req.body.username,
                  password: hash,
                  email: req.body.email,
                  gender: req.body.gender,
                  phoneNumber: req.body.phoneNumber,
                  role: req.body.role ? req.body.role : 'user',
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
                sendFailedResponse(res, 500, 'Unsuccessfully created new user.');
              }
            });
          } else {
            sendFailedResponse(res, 500, 'Unsuccessfully created new user.');
          }
        });
      } else {
        sendFailedResponse(res, 400, 'User is already existed.');
      }
    } else {
      sendFailedResponse(res, 400, 'Invalid data request.');
    }
  },
};
