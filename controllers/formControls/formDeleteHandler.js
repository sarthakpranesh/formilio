/* eslint-disable prefer-promise-reject-errors */
const Form = require('../../models/form');

const formDeleteHandler = ({formName} = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Form.findOneAndRemove({formName});
      resolve({
        statusCode: 1,
        status: 200,
        error: null,
        isDeleted: true,
      });
    } catch (err) {
      console.log(err);
      reject({
        statusCode: 9,
        status: err.code ? 400 : 500,
        error: err.message,
        isDeleted: false,
      });
    }
  });
};

module.exports = formDeleteHandler;
