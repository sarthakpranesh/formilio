/* eslint-disable max-len */
/* eslint-disable prefer-promise-reject-errors */
const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signInUserHandler = (email, password) => {
  return new Promise( async (resolve, reject) => {
    try {
      const user = await User.findUserWithEmail(email);
      if (!user) {
        return resolve({
          status: 200,
          statusCode: 6,
          error: 'User account not registered. Sign Up Now!',
          payload: null,
        });
      }
      const check = bcrypt.compareSync(password, user.password);
      if (!!check) {
        const token = jwt.sign({_id: user._id}, process.env.JWT_KEY);
        return resolve({
          status: 200,
          statusCode: 1,
          error: null,
          payload: {
            signInToken: token,
          },
        });
      }
      return resolve({
        status: 403,
        statusCode: 7,
        error: 'Password Incorrect!',
        payload: null,
      });
    } catch (err) {
      console.log(err);
      return reject({
        status: 500,
        statusCode: 9,
        error: err.message,
        payload: null,
      });
    }
  });
};

module.exports = signInUserHandler;
