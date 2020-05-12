const mongoose = require('mongoose');

// importing available validators
const globalValidators = require('../config/validator');

const FormSchema = new mongoose.Schema({
  formName: {
    type: String,
    required: true,
    minlength: [6, 'Form name too short'],
    maxlength: [40, 'Form name too long'],
  },
  userId: {
    type: mongoose.ObjectId,
    required: true,
  },
  description: {
    type: String,
    default: 'Not Provided',
    minlength: [
      6,
      'Description needs to be at least more then 6 characters long!',
    ],
    maxlength: [400, 'Description cannot have more then 400 characters!'],
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
        enum: Object.keys(globalValidators),
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

FormSchema.statics.getAllUserForms = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const form = await Form.find({userId});
      const cleanedForm = form.map((form) => {
        const formObj = form.toObject();
        return {
          formName: formObj.formName,
          description: formObj.description,
          _id: formObj._id,
        };
      });
      resolve(cleanedForm);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};

FormSchema.statics.findByFormId = (fid) => {
  return new Promise(async (resolve, reject) => {
    try {
      const form = await Form.findOne({_id: fid});
      if (!form) {
        return resolve(null);
      }
      return resolve(form.toObject());
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};

const Form = mongoose.model('form', FormSchema);

module.exports = Form;
