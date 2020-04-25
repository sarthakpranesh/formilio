const validator = require('validator');

const regNo = (reg) => {
  const regNoRegEx = new RegExp('[1-9]{2}[a-zA-Z]{3}[0-9]{4}');
  return reg.match(regNoRegEx)[0] === reg;
};

const username = (username) => {
  const regNoRegEx = new RegExp('[a-zA-Z0-9]{6,40}');
  return username.match(regNoRegEx)[0] === username;
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
