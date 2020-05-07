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

  return res.status(403).send({
    statusCode: 8,
    status: 403,
    token: null,
    error: 'Invalid Secret!',
  });
};

module.exports = clientSecretKeyValidator;
