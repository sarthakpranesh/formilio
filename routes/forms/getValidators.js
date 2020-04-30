const app = require('express')();
const validator = require('../../config/validator');

app.get('/auth/validators', (req, res) => {
  const validatorNames = Object.keys(validator);
  res.status(200).send({
    statusCode: 1,
    status: 200,
    payload: {
      validatorNames,
    },
  });
});

module.exports = app;
