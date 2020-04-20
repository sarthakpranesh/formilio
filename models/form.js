const mongoose = require('mongoose');

const FormSchema = new mongoose.Schema({
  formName: {
    type: String,
    unique: [true, 'Hey Looks like that form name is already in use!'],
    required: [true, 'Please provide a form name'],
    ref: 'responses',
    autopopulate: true,
  },
  createOn: {
    type: Date,
    default: Date.now,
  },
  fields: {
    type: [Map],
    required: true,
  },
});

FormSchema.plugin(require('mongoose-autopopulate'));

FormSchema.pre('save', function(next, doc) {
  console.log('This is pre hook');
  next();
});

FormSchema.post('save', function(doc, next) {
  console.log('This is a post hook');
  next();
});

const Form = mongoose.model('form', FormSchema);


module.exports = Form;
