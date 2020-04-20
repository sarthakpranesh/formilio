const validateResponse = (formFields, responseFields) => {
  /*
  Here formFields contain the rules and is a array of objects.
  Whereas the responseFields is an object
  */
  return new Promise(async (resolve, reject) => {
    try {
      let pass = true;
      formFields.forEach((attribute) => {
        const {name, type, regEx} = attribute;

        // check the if the response has the field
        if (!responseFields[name]) {
          pass = false;
        }

        // check the type of the response
        if (typeof(responseFields[name]).toLowerCase() !== type.toLowerCase()) {
          pass = false;
        }

        // check with regEx
        const reg = new RegExp(regEx);
        if (responseFields[name].match(reg)[0] !== responseFields[name]) {
          pass = false;
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
