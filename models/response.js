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

const Response = mongoose.model('response', ResponseSchema);

module.exports = Response;
