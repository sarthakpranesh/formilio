/* eslint-disable max-len */
const errorCodes = {
  'ValidationError': 'We could not validate your request!',
};

const mongoErrorHelper = (errCode) => {
  try {
    return errorCodes[errCode];
  } catch (err) {
    console.log('Error in MongoErrorHelper');
    return 'Undefined Error';
  }
};

module.exports = mongoErrorHelper;
