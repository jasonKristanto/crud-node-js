module.exports = {
  sendSuccessResponse: (res, message = 'success', data = []) => {
    res.status(200).json({
      message, data
    });
  },
  sendFailedResponse: (res, statusCode = 500, message = 'failed', data = []) => {
    res.status(statusCode).json({
      message, data
    });
  }
};
