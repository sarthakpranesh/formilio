const app = require('express')();

// importing middleware
const validateUserCredentials =
require('../../middleware/user/validateUserCredentials');

// importing controller
const signInUserHandler = require('../../controllers/user/signInUserHandler');

app.post('/signInUser', validateUserCredentials, (req, res) => {
  signInUserHandler(req.email, req.password)
      .then((resp) => res.status(resp.status).send(resp))
      .catch((err) => res.status(err.status).send(err));
});

module.exports = app;
