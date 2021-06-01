module.exports = {
  sendMiddlewareFailedResponse: (res, statusCode = 500, message = 'failed', data = []) => {
    res.status(statusCode).json({
      message, data,
    });
  },
  sendSuccessResult: (message = 'success', data = []) => ({
    statusCode: 200,
    status: 'success',
    message,
    data,
  }),
  sendFailedResult: (statusCode = 500, message = 'failed', details = []) => ({
    statusCode,
    status: 'failed',
    message,
    details,
  }),
  sendResponse: (res, result) => {
    res.status(result.statusCode).json({
      message: result.message,
      data: result.data,
    });
  },
};
