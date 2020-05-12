/* eslint-disable max-len */
const jwt = require('jsonwebtoken');
const User = require('../../models/user');

const validateUserToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log('User token: ', token);
    if (!!token) {
      const verify = jwt.verify(token.replace('Bearer ', ''), process.env.jwt_signature);
      if (!!verify) {
        const user = await User.findById({_id: verify._id});
        req.user = user;
        return next();
      }
      return res.status(403).end();
    }
    return res.status(400).end();
  } catch (err) {
    console.log('Error: ', err.message);
    return res.sendStatus(500).end();
  }
};

module.exports = validateUserToken;
