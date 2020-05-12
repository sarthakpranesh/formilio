/* eslint-disable max-len */
const app = require('express')();

// import middleware
const validateDeleteForm = require('../../middleware/form/validateDeleteForm');

// importing handlers
const formDeleteHandler = require('../../controllers/formControls/formDeleteHandler');

app.delete('/auth/deleteForm', validateDeleteForm, (req, res) => {
  console.log('Delete Form Request by: ', req.user.email);
  console.log('Form being deleted: ', req.fid);
  formDeleteHandler(req.fid)
      .then((resp) => res.status(200).send(resp))
      .catch((err) => res.status(err.status).send(err));
});

module.exports = app;
