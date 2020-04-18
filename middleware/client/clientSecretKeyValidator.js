const clientSecretKeyValidator = (req, res, next) => {
  if (req.headers.authorization !== undefined) {
    const key = req.headers.authorization.replace('Bearer ', '');
    if (
      !['', null, undefined].includes(key) &&
      key === process.env.admin_secret_key
    ) {
      req.clientKey = key;
      next();
      return;
    }
  }

  res.status(400).send({
    status: 8,
    statusMessage: 'Bad Request',
    payload: null,
    error: null,
  });
};

module.exports = clientSecretKeyValidator;
