/* eslint-disable max-len */
const errorNames = {
  'ValidationError': (error) => {
    const allErrors = Object.keys(error.errors);
    return allErrors.map((errName) => {
      return error.errors[errName].message;
    });
  },
  'MongoError': (error) => {
    return `${Object.keys(error.keyValue)} already exists`;
  },
};

const mongoErrorHelper = (err) => {
  try {
    return errorNames[err.name](err);
  } catch (err) {
    console.log('Error in MongoErrorHelper');
    return false;
  }
};

module.exports = mongoErrorHelper;
