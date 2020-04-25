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
      let pass = formFields.every((attribute) => {
        const {name, regEx} = attribute;
        attributeNames.push(name);
        // check the if the response has the field
        if (!responseFields[name]) {
          return false;
        }

        // check with regEx
        if (regEx === 'match') {
          return globalValidator.match(responseFields[name], attribute.checker);
        } else {
          return globalValidator[regEx](responseFields[name]);
        }
      });

      if (pass === false) {
        resolve(pass);
        return;
      }

      const responseFieldNames = Object.keys(responseFields);
      pass = JSON.stringify(attributeNames) === JSON.stringify(responseFieldNames);
      resolve(pass);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};

module.exports = validateResponse;
