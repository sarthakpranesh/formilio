const app = require('express')();
const User = require('../../models/user');

app.delete('/auth/deleteUser', async (req, res) => {
  const user = await User.findById({_id: req.body.id});
  await user.remove();
  return res.sendStatus(200).end();
});

module.exports = app;
