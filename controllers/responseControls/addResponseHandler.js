/* eslint-disable prefer-promise-reject-errors */
const Response = require('../../models/response');
const Form = require('../../models/form');

// importing helper functions
const validateResponse = require('../helpers/validateResponse');

const addResponseHandler = ({formName, responseFields} = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const form = await Form.findByFormName(formName);
      const pass = await validateResponse(form.fields, responseFields);
      console.log(pass);
      if (!pass) {
        throw new Error('Bad request');
      }
      const response = new Response({formName: formName, any: responseFields});
      await response.save();
      resolve({
        status: 200,
        statusCode: 1,
        error: null,
        isResponseAdded: true,
      });
    } catch (err) {
      reject({
        status: err.message === 'Bad request' || 'Form not found' ? 400 : 500,
        statusCode: 8,
        error: err.message,
        isResponseAdded: false,
      });
    }
  });
};

module.exports = addResponseHandler;
