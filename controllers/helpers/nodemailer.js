const nodemailer = require('nodemailer');

const sendEmail = (email, token) => {
  return new Promise((resolve, reject) => {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.USER_NAME,
          pass: process.env.USER_PASSWORD,
        },
      });
      transporter.sendMail({
        from: 'no-reply@formilio.com',
        to: email,
        subject: 'Verify email address - Formilio',
        text: 'Thank you for registering. Please click on the following link to verify your email - https://formilio-backend.herokuapp.com/auth/verifyEmail?token='+token,
      }, (err, info) => {
        if (err) {
          console.log(err);
        }
        resolve();
      });
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};

module.exports = sendEmail;
