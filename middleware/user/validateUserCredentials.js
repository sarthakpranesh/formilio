const validator = require('validator');
const Base64 = require('js-base64').Base64;

const validateCreateUserRequest = (req, res, next) => {
  try {
    const email = req.body.email ? req.body.email : '';
    const password = req.body.password ? req.body.password : '';
    console.log(!validator.isEmpty(password));
    if (validator.isEmail(email) && !validator.isEmpty(password)) {
      if (password.length < 6 || password.length > 40) {
        return res.status(400).send({
          status: 400,
          statusCode: 8,
          error: 'Password needs to have 6 - 40 characters',
          isUserCreated: false,
        }).end();
      }
      req.email = email;
      req.password = Base64.decode(password);
      return next();
    }
    return res.status(400).send({
      status: 400,
      statusCode: 8,
      error: 'Email or Password not provided',
      isUserCreated: false,
    }).end();
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({
      status: 500,
      statusCode: 9,
      error: err.message,
      isUserCreated: false,
    }).end();
  }
};

module.exports = validateCreateUserRequest;
