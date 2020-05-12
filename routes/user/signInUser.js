const app = require('express')();

// importing middleware
const validateSignInUser = require('../../middleware/user/validateSignInUser');

// importing controller
const signInUserHandler = require('../../controllers/user/signInUserHandler');

app.post('/signInUser', validateSignInUser, (req, res) => {
  signInUserHandler(req.email, req.password)
      .then((resp) => res.status(resp.status).send(resp))
      .catch((err) => res.status(err.status).send(err));
});

module.exports = app;
