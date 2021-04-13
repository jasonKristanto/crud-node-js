const tokenDb = require('../../models/tokenModels');

const {sendSuccessResponse, sendFailedResponse} = require('../../helpers/responseHelpers');

module.exports = {
  logoutService: async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    console.log(req.user.username);
    console.log(token);

    const isUserTokenExists = await tokenDb.exists({
      token: token
    });

    console.log(isUserTokenExists);

    if (isUserTokenExists) {
      tokenDb.deleteMany({
        token: token
      })
        .then(data => {
          if (data.deletedCount > 0) {
            sendSuccessResponse(res, 'Logout successfully.');
          } else {
            sendFailedResponse(res, 404, 'Unauthorized');
          }
        })
        .catch(err => {
          console.log(err);
          sendFailedResponse(res, 500, 'Unsuccessfully logged out.');
        });
    } else {
      sendFailedResponse(res, 401, 'Unauthorized');
    }
  },
};
