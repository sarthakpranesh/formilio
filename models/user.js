const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isEmailVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
  token: {
    type: String,
    required: true,
  },
});

UserSchema.statics.findUserWithEmail = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({email});
      if (!user) {
        resolve(false);
      }
      resolve(user.toObject());
    } catch (err) {
      reject(err.message);
    }
  });
};

const User = mongoose.model('user', UserSchema);

module.exports = User;
