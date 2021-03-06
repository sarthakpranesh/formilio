/* eslint-disable prefer-promise-reject-errors */
const Response = require('../../models/response');
const Form = require('../../models/form');

// importing helper functions
const validateResponse = require('../helpers/validateResponse');

const addResponseHandler = ({fid, responseFields} = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const form = await Form.findByFormId(fid);
      const error = await validateResponse(form.fields, responseFields);
      if (error.length !== 0) {
        return resolve({
          status: 200,
          statusCode: 2, // user input error
          error,
          isResponseAdded: false,
        });
      }
      const response = new Response({fid: fid, any: responseFields});
      await response.save();
      return resolve({
        status: 200,
        statusCode: 1,
        error: null,
        isResponseAdded: true,
      });
    } catch (err) {
      console.log(err);
      reject({
        status: err.message === 'Form not found' ? 400 : 500,
        statusCode: err.message === 'Form not found' ? 8 : 9,
        error: err.message,
        isResponseAdded: false,
      });
    }
  });
};

module.exports = addResponseHandler;
