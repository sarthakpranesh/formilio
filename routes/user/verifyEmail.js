const app = require('express')();
const User = require('../../models/user');

app.get('/auth/verifyEmail', async (req, res) => {
  const token = req.query.token;
  if (!!token) {
    await User.findOneAndUpdate({token}, {isEmailVerified: true});
    res.status(200).send('Email Verified, Proceed to login!');
  }
  res.status(403).end();
});

module.exports = app;
