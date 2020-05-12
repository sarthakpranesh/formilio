const validator = require('validator');
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.SERVER_KEY);

const validateCreateUserRequest = (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    console.log(cryptr.decrypt(password));
    if (validator.isEmail(email) && ![undefined, null, ''].includes(password)) {
      req.email = email;
      req.password = cryptr.decrypt(password);
      return next();
    }
    return res.status(400).send({
      status: 400,
      statusCode: 8,
      error: 'Email or Password not valid',
      userToken: null,
    }).end();
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({
      status: 500,
      statusCode: 9,
      error: err.message,
      userToken: null,
    }).end();
  }
};

module.exports = validateCreateUserRequest;
