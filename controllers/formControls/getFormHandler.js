/* eslint-disable prefer-promise-reject-errors */
const Form = require('../../models/form');

const getFormHandler = (fid) => {
  return new Promise(async (resolve, reject) => {
    try {
      const form = await Form.findByFormId(fid);
      return resolve({
        statusCode: 1,
        form: form ? form : {},
        formRetrieved: form ? true : false,
        error: null,
      });
    } catch (err) {
      console.log(err.message);
      return reject({
        statusCode: 1,
        form: {},
        formRetrieved: false,
        error: error.message,
      });
    }
  });
};

module.exports = getFormHandler;
