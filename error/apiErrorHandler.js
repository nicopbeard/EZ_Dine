const ApiError = require('./ApiError');

function apiErrorHandler(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  if (err instanceof ApiError) {
    res.status(err.code).json(err.message);
    return;
  }

  res.status(500).json({'An unknown error occurred (server side)': err.message})
}

module.exports = apiErrorHandler;
