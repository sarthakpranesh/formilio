const Form = require('../../models/form');

const validateDeleteForm = async (req, res, next) => {
  try {
    const fid = req.query.fid;
    if (!!fid) {
      const form = await Form.findById({_id: fid});
      if (form === null) {
        return res.status(200).send({
          status: 200,
          statusCode: 1,
          error: '',
          isFormDeleted: true,
        });
      }
      if (req.user._id.toString() === form.userId.toString()) {
        req.fid = fid;
        return next();
      }
      return res.status(403).send({
        status: 403,
        statusCode: 7,
        error: 'You do not have ownership of the form!',
        isFormDeleted: false,
      });
    }
    return res.status(400).send({
      status: 400,
      statusCode: 8,
      error: 'Bad Request',
      isFormDeleted: false,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({
      status: 500,
      statusCode: 9,
      error: err.message,
      isFormDeleted: false,
    });
  }
};

module.exports = validateDeleteForm;
