/* eslint-disable prefer-promise-reject-errors */
const Response = require('../../models/response');
const Form = require('../../models/form');

// importing helper functions
const validateResponse = require('../helpers/validateResponse');

const addResponseHandler = ({formName, responseFields} = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const form = await Form.findByFormName(formName);
      const error = await validateResponse(form.fields, responseFields);
      if (error.length !== 0) {
        resolve({
          status: 200,
          statusCode: 2, // user input error
          error,
          isResponseAdded: false,
        });
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
      console.log(err);
      reject({
        status: 500,
        statusCode: 9,
        error: err.message,
        isResponseAdded: false,
      });
    }
  });
};

module.exports = addResponseHandler;
