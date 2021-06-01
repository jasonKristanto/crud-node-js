const bcrypt = require('bcryptjs');

const UserDb = require('../../models/models');
const { validateUserRequest } = require('../../requests/requests');
const { sendSuccessResult, sendFailedResult } = require('../../helpers/response-helpers');

module.exports = {
  createUserService: async (req) => {
    const {
      username,
      password,
      email,
      gender,
      phoneNumber,
      role,
    } = req.body;

    if (validateUserRequest(req)) {
      const isUserNameExists = await UserDb.exists({ username });
      const isEmailExists = await UserDb.exists({ email });

      if (!isUserNameExists && !isEmailExists) {
        return bcrypt.genSalt(10)
          .then((salt) => bcrypt.hash(password, salt))
          .then((hashPassword) => new UserDb({
            username,
            password: hashPassword,
            email,
            gender,
            phoneNumber,
            role: role || 'user',
          }))
          .then((user) => user.save(user))
          .then(() => sendSuccessResult('Successfully created new user.'))
          .catch((error) => {
            console.log(error);
            return sendFailedResult(500, 'Unsuccessfully created new user.');
          });
      }

      return sendFailedResult(400, 'User is already existed.');
    }

    return sendFailedResult(400, 'Invalid data request.');
  },
};
