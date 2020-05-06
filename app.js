const express = require('express');
const app = express();
const chalk = require('chalk');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT;

// initializing mongo connection
require('./config/mongoDb');

// adding global middleware
app.use(bodyParser.json());
app.use((req, res, next) => {
  if (req.method === 'GET' && req.path === '/') {
    console.log(chalk.yellow('Ping'));
    return res.sendStatus(200).end();
  }
  next();
});

// importing routes
const connectClient = require('./routes/client/connectClient');
const createForm = require('./routes/forms/createForm');
const deleteForm = require('./routes/forms/deleteForm');
const getAllForm = require('./routes/forms/getAllForm');
const getForm = require('./routes/forms/getForm');
const getFormResponse = require('./routes/forms/getFormResponse');
const getValidator = require('./routes/forms/getValidators');
const addResponse = require('./routes/response/submitResponse');
const requestForm = require('./routes/forms/requestForm');

// importing layer middleware
const validateClient = require('./middleware/form/validateClient');

// using routes and client specific middleware
app.use(cors());
app.use(requestForm);
app.use(addResponse);
app.use(connectClient);
app.use(validateClient);
app.use(getValidator);
app.use(createForm);
app.use(deleteForm);
app.use(getAllForm);
app.use(getForm);
app.use(getFormResponse);

app.listen(port, () => {
  console.log(chalk.green('Server started successfully: ', port));
});

