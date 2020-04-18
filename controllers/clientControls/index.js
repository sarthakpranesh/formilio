const jwt = require('jsonwebtoken');

const connectWithClient = (key) => {
  return new Promise((resolve, reject) => {
    try {
      const token = jwt.sign(key, process.env.jwt_signature);
      console.log(token);
      resolve({
        status: 1,
        payload: {
          token,
        },
        error: null,
      });
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = {
  connectWithClient,
};
