const app = require('express')();

// importing middleware
const validateCreateUserRequest =
require('../../middleware/user/validateCreateUserRequest');

// importing helper functions
const createUserHandler = require('../../controllers/user/createUserHandler');

app.post('/createUser', validateCreateUserRequest, (req, res) => {
  console.log(req.clientToken);
  createUserHandler(req.email, req.password)
      .then((resp) => res.status(200).send(resp))
      .catch((err) => res.status(err.status).send(err));
});

module.exports = app;
