const Base64 = require('js-base64').Base64;

const validateSignInUser = (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    if (!!email && !!password) {
      req.email = email;
      req.password = Base64.decode(password);
      return next();
    }
    console.log(req.body);
    return res.status(400).send({
      status: 400,
      statusCode: 8,
      error: 'Bad Request',
      payload: null,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: 500,
      statusCode: 9,
      error: err.message,
      payload: null,
    });
  }
};

module.exports = validateSignInUser;
