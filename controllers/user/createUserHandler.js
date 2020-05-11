/* eslint-disable prefer-promise-reject-errors */
const User = require('../../models/user');
const mongoErrorHelper = require('../../controllers/helpers/MongoErrorHelper');

const createUserHandler = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = new User({
        email: email.trim(),
        password: password.trim(),
      });
      await user.save();
      resolve({
        status: 200,
        statusCode: 1,
        error: null,
        isUserCreated: true,
      });
    } catch (err) {
      console.log(err);
      const errMsg = mongoErrorHelper(err);
      reject({
        status: errMsg ? 400 : 500,
        statusCode: errMsg ? 8 : 9,
        error: errMsg ? errMsg : err.message,
        isUserCreated: false,
      });
    }
  });
};

module.exports = createUserHandler;
