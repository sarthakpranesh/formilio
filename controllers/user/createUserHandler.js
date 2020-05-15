/* eslint-disable prefer-promise-reject-errors */
const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(Number(process.env.BCRYPT_SALT));
const sendEmail = require('../helpers/nodemailer');

const mongoErrorHelper = require('../../controllers/helpers/MongoErrorHelper');

const createUserHandler = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = new User({
        email: email.trim(),
        password: bcrypt.hashSync(password, salt),
        token: bcrypt.hashSync(password+email, salt),
      });
      await user.save();
      await sendEmail(email, user.token.toString());
      resolve({
        status: 200,
        statusCode: 1,
        error: null,
        isUserCreated: true,
      });
    } catch (err) {
      console.log(err.message);
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
