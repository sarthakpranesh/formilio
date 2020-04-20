const errorCodes = {
  11000: 'Form with name already present, please choose a different name.',
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
