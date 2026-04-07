function handleErrors(err, req, res, next) {

  console.error("Error:", err.message);

  const status = err.status || 500;

  res.status(status).json({
    success: false,
    message: err.message || req.__("internal_server_error")
  });

}

module.exports = handleErrors;