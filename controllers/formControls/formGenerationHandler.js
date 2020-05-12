/* eslint-disable prefer-promise-reject-errors */
const Form = require('../../models/form');
const mongoErrorHelper = require('../../controllers/helpers/MongoErrorHelper');
const crypto = require('../helpers/crypto');

const formGenerationHandler = (formName, fields, description, user) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newForm = new Form({
        formName: formName.trim(),
        userId: user._id,
        description: description.trim(),
        url: process.env.FRONTEND_BASEURL + crypto.encrypt(formName),
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
      const errMsg = mongoErrorHelper(err);
      reject({
        statusCode: 1,
        status: errMsg ? 400 : 500,
        error: errMsg ? errMsg : err.message,
        isFormCreated: false,
      });
    }
  });
};

module.exports = formGenerationHandler;
