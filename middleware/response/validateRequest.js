const crypto = require('../../controllers/helpers/crypto');
const GoogleRecaptcha = require('google-recaptcha');

const validateResponse = (req, res, next) => {
  const token = req.body.token;
  if ([undefined, null, ''].includes(token)) {
    console.log('Token not defined');
    return res.sendStatus(403).end();
  }
  const googleRecaptcha =
    new GoogleRecaptcha({secret: process.env.RECAPTCHA_KEY});
  googleRecaptcha.verify({response: token}, async (error)=>{
    if (error) {
      console.log(error);
      return res.sendStatus(403).end();
    }
    req.body.fid = crypto.decrypt(req.body.fid);
    next();
  });
};

module.exports = validateResponse;
