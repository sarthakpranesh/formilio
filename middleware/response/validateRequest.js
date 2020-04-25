const crypto = require('../../controllers/helpers/crypto');

const validateResponse = (req, res, next) => {
  console.log(crypto.decrypt(req.body.formName));
  req.body.formName = crypto.decrypt(req.body.formName);
  next();
};

module.exports = validateResponse;
