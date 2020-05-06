const app = require('express')();
const getFormHandler = require('../../controllers/formControls/getFormHandler');

app.get('/auth/getForm', (req, res) => {
  console.log(req.clientToken);
  if (!req.query.formName) {
    return res.sendStatus(400).end();
  }
  getFormHandler(req.query.formName)
      .then((resp) => res.status(200).send(resp))
      .catch((err) => res.status(err.status).send(err));
});

module.exports = app;
