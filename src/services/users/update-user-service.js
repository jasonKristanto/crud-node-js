const bcrypt = require('bcryptjs');

const userDb = require('../../models/models');
const { validateUserRequest } = require('../../requests/requests');
const { sendSuccessResult, sendFailedResult } = require('../../helpers/response-helpers');

module.exports = {
  updateUserService: async (req) => {
    const {
      username,
      password,
      email,
      gender,
      phoneNumber,
      role,
    } = req.body;

    if (validateUserRequest(req)) {
      const isRequestedUserExists = await userDb.exists({ username });

      if (isRequestedUserExists) {
        return bcrypt.genSalt(10)
          .then((salt) => bcrypt.hash(password, salt))
          .then((hashPassword) => userDb.updateOne({ username }, {
            username,
            password: hashPassword,
            email,
            gender,
            phoneNumber,
            role: role || 'user',
          }, { useFindAndModify: false }))
          .then(() => sendSuccessResult('Successfully updated user.'))
          .catch((error) => {
            console.log(error);
            return sendFailedResult(500, 'Unsuccessfully updated user.');
          });
      }

      return sendFailedResult(400, 'Users is not found and/or New Username is already exists.');
    }

    return sendFailedResult(400, 'Invalid data request.');
  },
};
