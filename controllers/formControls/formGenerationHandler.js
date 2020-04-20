/* eslint-disable prefer-promise-reject-errors */
const Form = require('../../models/form');
const mongoErrorHelper = require('../../controllers/helpers/MongoErrorHelper');

const formGenerationHandler = ({formName, fields} = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newForm = new Form({
        formName,
        fields: [
          {
            name: 'User Name',
            type: 'String',
            regEx: new RegExp(`[0-9]+`, 'g'),
          },
        ],
      });
      await newForm.save();
      resolve({
        statusCode: 1,
        status: 200,
        error: null,
        isFormCreated: true,
      });
    } catch (err) {
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
