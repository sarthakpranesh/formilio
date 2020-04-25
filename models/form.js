const mongoose = require('mongoose');

const FormSchema = new mongoose.Schema({
  formName: {
    type: String,
    unique: true,
    required: true,
  },
  url: {
    type: 'String',
    required: true,
    unique: true,
  },
  createOn: {
    type: Date,
    default: Date.now,
  },
  fields: [
    {
      name: {
        type: String,
        required: true,
      },
      regEx: {
        type: String,
        enum: [
          'email',
          'alpha',
          'alphaNumeric',
          'number',
          'url',
          'match',
          'regNo',
          'username',
        ],
        required: true,
      },
      checker: {
        type: String,
        required: false,
      },
    },
  ],
});

FormSchema.pre('save', function(next, doc) {
  console.log('This is pre hook');
  next();
});

FormSchema.post('save', function(doc, next) {
  console.log('This is a post hook');
  next();
});

FormSchema.statics.findByFormName = (formName) => {
  return new Promise(async (resolve, reject) => {
    try {
      const form = await Form.findOne({formName});
      if (!form) {
        throw new Error('Form not found');
      }
      resolve(form);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};

const Form = mongoose.model('form', FormSchema);

module.exports = Form;
