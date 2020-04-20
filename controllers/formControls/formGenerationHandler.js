/* eslint-disable prefer-promise-reject-errors */
const Form = require('../../models/form');
const mongoErrorHelper = require('../../controllers/helpers/MongoErrorHelper');

const formGenerationHandler = ({formName, fields} = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newForm = new Form({
        formName,
        fields: fields,
      });
      await newForm.save();
      resolve({
        statusCode: 1,
        status: 200,
        error: null,
        isFormCreated: true,
      });
    } catch (err) {
      console.log(err);
      const errMsg = mongoErrorHelper(err.code);
      reject({
        statusCode: 1,
        status: err.code ? 400 : 500,
        error: errMsg,
        isFormCreated: false,
      });
    }
  });
};

module.exports = formGenerationHandler;
