const port = process.env.PORT;

const express = require('express');
const app = express();
const chalk = require('chalk');
const bodyParser = require('body-parser');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');


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
const requestForm = require('./routes/forms/requestForm');
const addResponse = require('./routes/response/submitResponse');
const createUser = require('./routes/user/createUser');
const verifyEmail = require('./routes/user/verifyEmail');
const signInUser = require('./routes/user/signInUser');
const createForm = require('./routes/forms/createForm');
const deleteForm = require('./routes/forms/deleteForm');
const getAllForm = require('./routes/forms/getAllForm');
const getForm = require('./routes/forms/getForm');
const getFormResponse = require('./routes/forms/getFormResponse');
const getValidator = require('./routes/forms/getValidators');

// delete route only for tests
const deleteUser = require('./routes/user/deleteUser');

// importing layer middleware
const validateUserToken = require('./middleware/user/validateUserToken');
const validateGetForm = require('./middleware/form/validateGetForm');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // limit each IP to 200 requests per windowMs
});

// using routes and client specific middleware
app.set('trust proxy', 1);
app.use(limiter);
app.use(helmet());
app.use(cors());
app.use(requestForm);
app.use(addResponse);
app.use(createUser);
app.use(verifyEmail);
app.use(signInUser);
if (port === '8080') {
  console.log('Dev Server');
  app.use(deleteUser);
}
app.use(validateUserToken);
app.use(getValidator);
app.use(createForm);
app.use(deleteForm);
app.use(getAllForm);
app.use(validateGetForm);
app.use(getForm);
app.use(getFormResponse);

app.listen(port, () => {
  console.log(chalk.green(
      'Server started successfully: ',
      port,
  ));
});

module.exports = app;
