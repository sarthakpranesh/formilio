const app = require('express')();
const fs = require('fs');
const {parse} = require('json2csv');

const Response = require('../../models/response');

app.get('/auth/getResponse', (req, res) => {
  console.log('Form Download request by: ', req.user.email);
  console.log('Form id: ', req.fid);
  Response.findByFormId({_id: req.fid})
      .then(async (data, formFields) => {
        try {
          const csv = parse(data, {formFields});
          fs.writeFileSync(`formilio-${req.fid}.csv`, csv);
          res.download(`formilio-${req.fid}.csv`, () => {
            fs.unlinkSync(`formilio-${req.fid}.csv`);
          });
          return;
        } catch (err) {
          console.error(err);
        }
      });
});

module.exports = app;
