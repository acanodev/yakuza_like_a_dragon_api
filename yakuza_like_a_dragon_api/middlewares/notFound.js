module.exports = (request, response, next) => {
  response.status(404).json({
    ok: false,
    error: request.__('not_found'),
  });
};
