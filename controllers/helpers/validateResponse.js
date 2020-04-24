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
      let pass = true;
      let attributeNames = [];
      formFields.forEach((attribute) => {
        const {name, regEx} = attribute;
        attributeNames.push(name);
        // check the if the response has the field
        if (!responseFields[name]) {
          pass = false;
          return;
        }

        // check with regEx
        if (regEx === 'match') {
          console.log(globalValidator.match(responseFields[name], attribute.checker));
          pass = globalValidator.match(responseFields[name], attribute.checker);
          return;
        } else {
          pass = globalValidator[regEx](responseFields[name]);
          return;
        }
      });

      const responseFieldNames = Object.keys(responseFields);
      responseFieldNames.forEach((field) => {
        if (!attributeNames.includes(field)) {
          pass = false;
          return;
        }
      });
      resolve(pass);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};

module.exports = validateResponse;
