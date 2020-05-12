const app = require('express')();
const getFormHandler = require('../../controllers/formControls/getFormHandler');

app.get('/auth/getForm', (req, res) => {
  console.log('Form details requested by: ', req.user.email);
  console.log('Form id: ', req.fid);
  getFormHandler(req.fid)
      .then((resp) => res.status(200).send(resp))
      .catch((err) => res.status(err.status).send(err));
});

module.exports = app;
