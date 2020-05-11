const validator = require('validator');

const validateCreateUserRequest = (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    if (validator.isEmail(email) && ![undefined, null, ''].includes(password)) {
      req.email = email;
      req.password = password;
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
