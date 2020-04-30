const mongoose = require('mongoose');

const ResponseSchema = new mongoose.Schema({
  formName: {
    type: String,
    required: true,
  },
  resp: mongoose.Schema.Types.Mixed,
}, {
  strict: false,
});

ResponseSchema.statics.findByFormName = (formName) => {
  return new Promise(async (resolve, reject) => {
    try {
      const responseData = await Response.find({formName});
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
