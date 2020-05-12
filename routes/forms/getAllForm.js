/* eslint-disable max-len */
const app = require('express')();

// importing helper function
const getAllFormHandler = require('../../controllers/formControls/getAllFormHandler');

app.get('/auth/getAllForm', (req, res) => {
  console.log('All forms called by: ', req.user.email);
  getAllFormHandler(req.user._id)
      .then((resp) => res.status(200).send(resp))
      .catch((err) => res.status(err.status).send(err));
});

module.exports = app;
