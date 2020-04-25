/* eslint-disable prefer-promise-reject-errors */
const Form = require('../../models/form');
const mongoErrorHelper = require('../../controllers/helpers/MongoErrorHelper');
const crypto = require('../helpers/crypto');

const formGenerationHandler = ({formName, fields} = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newForm = new Form({
        formName,
        url: process.env.frontEndURl + crypto.encrypt(formName),
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
      const errMsg = mongoErrorHelper(err.name);
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
