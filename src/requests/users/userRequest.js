const validator = require('validator');

module.exports = {
  validateUserRequest: (req) => {
    if (!req.body) {
      return false;
    }

    if (validator.isEmpty(req.body.username) || validator.isEmpty(req.body.email) || validator.isEmpty(req.body.password)) {
      return false;
    }

    if (!validator.isEmpty(req.body.email) && !validator.isEmail(req.body.email)) {
      return false;
    }

    if (!validator.isEmpty(req.body.phoneNumber) && !validator.isMobilePhone(req.body.phoneNumber, 'id-ID')) {
      return false;
    }

    if (!validator.isEmpty(req.body.gender) && !['male', 'female'].includes(req.body.gender)) {
      return false;
    }

    return true;
  },
};
