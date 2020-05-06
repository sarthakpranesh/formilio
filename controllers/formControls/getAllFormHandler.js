/* eslint-disable prefer-promise-reject-errors */
const Form = require('../../models/form');

const getAllFormHandler = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const forms = await Form.getAllForms();
      resolve({
        status: 200,
        statusCode: 1,
        payload: {
          forms,
        },
        error: null,
      });
    } catch (err) {
      console.log(err);
      reject({
        status: 500,
        statusCode: 9,
        payload: null,
        error: err.message,
      });
    }
  });
};

module.exports = getAllFormHandler;
