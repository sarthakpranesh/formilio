const app = require('express')();
const chalk = require('chalk');

// importing middleware
// eslint-disable-next-line max-len
const adminSecretKeyValidator = require('../../middleware/client/clientSecretKeyValidator');

// importing controllers
const {connectWithClient} = require('../../controllers/clientControls/index');

app.post('/connectClient', adminSecretKeyValidator, (req, res) => {
  console.log(chalk.yellow('Create Admin Request'));
  connectWithClient(req.clientKey)
      .then((resp) => res.status(resp.status).send(resp))
      .catch((err) => res.status(err.status).send(err));
});

module.exports = app;
