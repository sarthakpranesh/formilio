const jwt = require('jsonwebtoken');

const validateClient = (req, res, next) => {
  if (req.headers.authorization !== undefined) {
    const clientToken = req.headers.authorization.replace('Bearer ', '');
    if (!['', null, undefined].includes(clientToken)) {
      let result;
      try {
        result = jwt.verify(clientToken, process.env.jwt_signature);
      } catch (err) {
        console.log(err.message);
      }
      if (result === process.env.admin_secret_key) {
        req.clientToken = clientToken;
        next();
        return;
      }
    }
  }

  res.status(400).send({
    status: 8,
    statusMessage: 'Bad Request',
    payload: null,
    error: null,
  });
};

module.exports = validateClient;
