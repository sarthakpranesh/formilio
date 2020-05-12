/* eslint-disable max-len */
const app = require('express')();
const chalk = require('chalk');

// importing middleware
const validateCreateForm = require('../../middleware/form/validateCreateForm');

// importing controllers
const formGenerationHandler = require('../../controllers/formControls/formGenerationHandler');

app.post('/auth/createForm', validateCreateForm, (req, res) => {
  console.log(chalk.yellow('Create Form requested'));
  formGenerationHandler(req.formName, req.fields, req.description)
      .then((resp) => res.status(200).send(resp))
      .catch((err) => res.status(err.status).send(err));
});

module.exports = app;
