const app = require('express')();
const User = require('../../models/user');

app.delete('/auth/deleteUser', async (req, res) => {
  const user = await User.findOne({email: req.body.email});
  await user.remove();
  return res.sendStatus(200).end();
});

module.exports = app;
