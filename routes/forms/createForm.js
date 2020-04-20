/* eslint-disable max-len */
const app = require('express')();
const chalk = require('chalk');

// importing controllers
const formGenerationHandler = require('../../controllers/formControls/formGenerationHandler');

app.post('/auth/createForm', (req, res) => {
  console.log(chalk.yellow('Create Form requested'));
  if (!req.body.formName || !req.body.fields) {
    return res.sendStatus(400).end();
  }
  if (!req.body.fields[0]) {
    return res.sendStatus(400).end();
  }
  formGenerationHandler(req.body)
      .then((resp) => res.status(200).send(resp))
      .catch((err) => res.status(err.status).send(err));
});

module.exports = app;
