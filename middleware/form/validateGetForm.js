const validateGetForm = (req, res, next) => {
  try {
    const fid = req.query.fid;
    if (!!fid) {
      req.fid = fid;
      return next();
    }
    return res.sendStatus(400);
  } catch (err) {
    console.log(err.message);
    return res.sendStatus(500).end();
  }
};

module.exports = validateGetForm;
