const app = require('express')();

// importing middleware
const validateUserCredentials =
require('../../middleware/user/validateUserCredentials');

// importing helper functions
const createUserHandler = require('../../controllers/user/createUserHandler');

app.post('/createUser', validateUserCredentials, (req, res) => {
  console.log('Create user request from: ', req.email);
  createUserHandler(req.email, req.password)
      .then((resp) => res.status(200).send(resp))
      .catch((err) => res.status(err.status).send(err));
});

module.exports = app;
