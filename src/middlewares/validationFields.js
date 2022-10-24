const { validationResult } = require('express-validator');

const validateFields = (req, res, next) => {
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      return res.status(400).json({
        ok: false,
        errors: errors.mapped(),
      });
    }
    return next();
  } catch (error) {
    error.type = 'fields';
    return next(error);
  }
};

module.exports = {
  validateFields,
};
