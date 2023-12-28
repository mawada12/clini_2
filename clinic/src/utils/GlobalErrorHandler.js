const globalError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  return res.status(err.statusCode).json({
    statusCode: err.statusCode,
    error: err.message,
  });
};

const globalErrorDev = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  return res.status(err.statusCode).json({
    statusCode: err.statusCode,
    error: err.message,
    errorStack: err.stack,
  });
};

module.exports = { globalError, globalErrorDev };
