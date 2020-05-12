const validateCreateForm = (req, res, next) => {
  try {
    const formName = req.body.formName;
    const fields = req.body.fields;
    const description =
    !!req.body.description ? req.body.description : undefined;
    if (!!formName && !!fields) {
      req.formName = formName;
      req.fields = fields;
      req.description = description;
      return next();
    }
    return res.status(400).send({
      status: 400,
      statusCode: 8,
      error: 'Bad request',
      isFormAdded: false,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({
      status: 500,
      statusCode: 9,
      error: err.message,
      isFormAdded: false,
    });
  }
};

module.exports = validateCreateForm;
