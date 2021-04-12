const {sendSuccessResponse, sendFailedResponse} = require('../helpers/responseHelpers');

const userDb = require('../models/models');

exports.login = (req, res) => {
  console.log(req);
  console.log(res);
  sendSuccessResponse(res, 'hello login');
};
exports.logout = (req, res) => {
  sendSuccessResponse(res, 'hello logout');
};

exports.createUser = (req, res) => {
  if (req.body) {
    const user = new userDb({
      name: req.body.name,
      email: req.body.email,
      gender: req.body.gender,
      phoneNumber: req.body.phoneNumber,
      password: req.body.password,
    });

    user
        .save(user)
        .then(data => {
          console.log(data);
          sendSuccessResponse(res, 'Successfully created new users.');
        })
        .catch(e => {
          console.log(e);
          sendFailedResponse(res, 500, 'Unsuccessfully created new users.');
        });
  } else {
    sendFailedResponse(res, 400, 'Content can not be empty.');
  }
};

exports.getAllUsers = (req, res) => {
  userDb.find()
      .then(user => {
        console.log(user);
        sendSuccessResponse(res, 'Successfully get all users.', user);
      })
      .catch(e => {
        console.log(e);
        sendFailedResponse(res, 500, 'Unsuccessfully get all users.');
      });
};

exports.getUser = (req, res) => {
  userDb.find({email: req.params.email})
      .then(user => {
        console.log(user);
        sendSuccessResponse(res, 'Successfully get the user.', user);
      })
      .catch(e => {
        console.log(e);
        sendFailedResponse(res, 500, 'Unsuccessfully get the user.');
      });
};

exports.updateUser = (req, res) => {
  if (req.body) {
    userDb.findOneAndUpdate(req.params.email, req.body, {useFindAndModify: false})
        .then(data => {
          console.log(data);
          sendSuccessResponse(res, 'Successfully updated user.');
        })
        .catch(e => {
          console.log(e);
          sendFailedResponse(res, 500, 'Unsuccessfully updated user.');
        });
  } else {
    sendFailedResponse(res, 400, 'Content can not be empty.');
  }
};

exports.deleteUser = (req, res) => {
  userDb.deleteOne({email: req.params.email})
      .then(data => {
        console.log(data);
        sendSuccessResponse(res, 'Successfully deleted user.');
      })
      .catch(e => {
        console.log(e);
        sendFailedResponse(res, 500, 'Unsuccessfully deleted user.');
      });
};

exports.fallback = (req, res) => {
  sendFailedResponse(res, 404, 'Page Not Found');
};
