/* eslint-disable prefer-promise-reject-errors */
const Form = require('../../models/form');
const Response = require('../../models/response');

const formDeleteHandler = (fid) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Form.findByIdAndDelete({_id: fid});
      await Response.deleteMany({_id: fid});
      resolve({
        statusCode: 1,
        status: 200,
        error: null,
        isFormDeleted: true,
      });
    } catch (err) {
      console.log(err);
      reject({
        statusCode: 9,
        status: err.code ? 400 : 500,
        error: err.message,
        isFormDeleted: false,
      });
    }
  });
};

module.exports = formDeleteHandler;
