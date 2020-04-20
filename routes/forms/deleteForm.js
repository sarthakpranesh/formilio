/* eslint-disable max-len */
const app = require('express')();

// importing handlers
const formDeleteHandler = require('../../controllers/formControls/formDeleteHandler');

app.delete('/auth/deleteForm', (req, res) => {
  console.log('Delete Form Request');
  if (!req.query.formName) {
    return res.sendStatus(400).end();
  }
  formDeleteHandler(req.query)
      .then((resp) => res.status(200).send(resp))
      .catch((err) => res.status(err.status).send(err));
});

module.exports = app;
