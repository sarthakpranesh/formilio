const express = require('express');
const app = express();
const chalk = require('chalk');
const bodyParser = require('body-parser');
const port = process.env.port;

// initializing mongo connection
require('./config/mongoDb');

// adding global middleware
app.use(bodyParser.json());
app.use((req, res, next) => {
  if (req.method === 'GET' && req.path === '/') {
    res.sendStatus(200).end();
  }
  next();
});

// importing routes
const connectClient = require('./routes/client/connectClient');
const createForm = require('./routes/forms/createForm');
const deleteForm = require('./routes/forms/deleteForm');

// importing layer middleware
const validateClient = require('./middleware/form/validateClient');

// using routes and client specific middleware
app.use(connectClient);
app.use(validateClient);
app.use(createForm);
app.use(deleteForm);

app.listen(port, () => {
  console.log(chalk.green('Server started successfully: ', port));
});
