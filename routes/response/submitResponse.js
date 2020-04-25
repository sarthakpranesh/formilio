/* eslint-disable max-len */
const app = require('express')();
const chalk = require('chalk');
const validateRequest = require('../../middleware/response/validateRequest');

// importing controllers
const addResponseHandler = require('../../controllers/responseControls/addResponseHandler');

app.post('/addResponse', validateRequest, (req, res) => {
  console.log(chalk.yellow('Add Response Route'));
  addResponseHandler(req.body)
      .then((resp) => res.status(200).send(resp))
      .catch((err) => res.status(err.status).send(err));
});

module.exports = app;
