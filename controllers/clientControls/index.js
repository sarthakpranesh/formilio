/* eslint-disable prefer-promise-reject-errors */
const jwt = require('jsonwebtoken');

const connectWithClient = (key) => {
  return new Promise((resolve, reject) => {
    try {
      const token = jwt.sign(key, process.env.JWT_KEY);
      resolve({
        statusCode: 1,
        status: 200,
        token,
        error: null,
      });
    } catch (err) {
      reject({
        statusCode: 8,
        status: 403,
        token: null,
        error: err.message,
      });
    }
  });
};

module.exports = {
  connectWithClient,
};
