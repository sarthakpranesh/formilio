const app = require('express')();
const chalk = require('chalk');

app.post('/auth/createForm', (req, res) => {
  console.log(chalk.yellow('Create Form requested'));
  console.log(req.clientToken);
  res.sendStatus(200).end();
});

module.exports = app;
