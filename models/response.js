const mongoose = require('mongoose');

const ResponseSchema = new mongoose.Schema({
  fid: {
    type: String,
    required: true,
  },
  resp: mongoose.Schema.Types.Mixed,
}, {
  strict: false,
});

ResponseSchema.statics.findByFormId = (fid) => {
  return new Promise(async (resolve, reject) => {
    try {
      const responseData = await Response.find({fid: fid});
      if (responseData.length === 0) {
        resolve([{Empty: 'This form has no responses yet'}], ['Empty']);
        return;
      }
      const cleanedList = responseData.map((item) => {
        return item.toObject().any;
      });
      resolve(cleanedList, Object.keys(cleanedList[0]));
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};

const Response = mongoose.model('response', ResponseSchema);

module.exports = Response;
