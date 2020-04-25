const app = require('express')();
const chalk = require('chalk');
const crypto = require('../../controllers/helpers/crypto');

const Form = require('../../models/form');

app.get('/requestForm', (req, res) => {
  console.log(chalk.yellow('Request Form Details'));
  if (!req.query.formName) {
    return res.sendStatus(400).end();
  }
  Form.findByFormName(crypto.decrypt(req.query.formName))
      .then((form) => {
        res.status(200).send({
          statusCode: 1,
          form: form ? form.fields : [],
          error: null,
        });
        return;
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send({
          statusCode: 9,
          form: null,
          error: err.message,
        });
        return;
      });
});

module.exports = app;
