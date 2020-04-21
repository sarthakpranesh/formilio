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
        const {name, type, regEx} = attribute;
        attributeNames.push(name);
        // check the if the response has the field
        if (!responseFields[name]) {
          pass = false;
          return;
        }

        // check the type of the response
        if (typeof(responseFields[name]).toLowerCase() !== type.toLowerCase()) {
          pass = false;
          return;
        }

        // check with regEx
        const reg = new RegExp(regEx);
        if (responseFields[name].match(reg)[0] !== responseFields[name]) {
          pass = false;
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
