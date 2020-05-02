/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable max-len */
/* eslint-disable prefer-const */
const globalValidator = require('../../config/validator');

const validateResponse = (formFields, responseFields) => {
  /*
  Here formFields contain the rules and is a array of objects.
  Whereas the responseFields is an object
  */
  return new Promise(async (resolve, reject) => {
    try {
      let attributeNames = [];
      let error = [];
      formFields.forEach((attribute) => {
        const {name, regEx} = attribute;
        attributeNames.push(name);

        // check the if the response has the field
        if (!responseFields[name]) {
          error.push(`${ name } not found!`);
          return;
        }

        // check with regEx
        let tmp = false;
        if (regEx === 'match') {
          tmp = globalValidator.match(responseFields[name], attribute.checker);
          if (!tmp) {
            error.push(`Not a valid Input for field ${name}`);
          }
          return;
        } else {
          tmp = globalValidator[regEx](responseFields[name]);
          if (!tmp) {
            error.push(`Not a valid Input for field *${name}*`);
          }
          return;
        }
      });

      if (error !== {}) {
        resolve(error);
        return;
      }

      const responseFieldNames = Object.keys(responseFields);
      if (JSON.stringify(attributeNames) === JSON.stringify(responseFieldNames)) {
        error.push('Please do not pass extra fields');
      }
      resolve(error);
      return;
    } catch (err) {
      reject(err.message);
    }
  });
};

module.exports = validateResponse;
