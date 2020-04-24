const validator = require('validator');

const regNo = (reg) => {
  const regNoRegEx = new RegExp('[1-9]{2}[a-zA-Z]{3}[0-9]{4}');
  return reg.match(regNoRegEx)[0] === reg;
};

const globalValidator = {
  email: validator.isEmail,
  alpha: validator.isAlpha,
  alphaNumeric: validator.isAlphanumeric,
  number: validator.isNumeric,
  url: validator.isURL,
  match: validator.matches,
  regNo,
};

module.exports = globalValidator;
