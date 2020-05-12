const app = require('express')();
const chalk = require('chalk');
const crypto = require('../../controllers/helpers/crypto');

const Form = require('../../models/form');

app.get('/requestForm', (req, res) => {
  console.log(chalk.yellow('Request Form Details'));
  if (!req.query.fid) {
    return res.sendStatus(400).end();
  }
  Form.findByFormId(crypto.decrypt(req.query.fid))
      .then((form) => {
        if (!form) {
          return res.status(200).send({
            statusCode: 1,
            form: [],
            wasFormFound: false,
            error: null,
          });
        }
        return res.status(200).send({
          statusCode: 1,
          form: form ? form.fields : [],
          wasFormFound: true,
          error: null,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send({
          statusCode: 8,
          form: null,
          wasFormFound: false,
          error: err.message,
        });
        return;
      });
});

module.exports = app;
