const validator = require('validator');

const regNo = (reg) => {
  const regNoRegEx = new RegExp('[1-9]{2}[a-zA-Z]{3}[0-9]{4}');
  try {
    return reg.match(regNoRegEx)[0] === reg;
  } catch (err) {
    console.log(err.message);
    return false;
  }
};

const username = (username) => {
  const regNoRegEx = new RegExp('[a-zA-Z0-9]{3,40}');
  try {
    return username.match(regNoRegEx)[0] === username;
  } catch (err) {
    console.log(err.message);
    return false;
  }
};

const globalValidator = {
  email: validator.isEmail,
  alpha: validator.isAlpha,
  alphaNumeric: validator.isAlphanumeric,
  number: validator.isNumeric,
  url: validator.isURL,
  match: validator.matches,
  regNo,
  username,
};

module.exports = globalValidator;
