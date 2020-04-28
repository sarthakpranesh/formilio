const app = require('express')();
const fs = require('fs');
const {parse} = require('json2csv');

const Response = require('../../models/response');

app.get('/auth/getResponse', (req, res) => {
  const formName = req.query.formName;
  Response.findByFormName(formName)
      .then(async (data, formFields) => {
        try {
          const csv = parse(data, {formFields});
          fs.writeFileSync(`${formName}.csv`, csv);
          res.download(`${formName}.csv`, () => {
            fs.unlinkSync(`${formName}.csv`);
          });
          return;
        } catch (err) {
          console.error(err);
        }
      });
});

module.exports = app;
