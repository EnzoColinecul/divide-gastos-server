const { response } = require('express');
const jwt = require('jsonwebtoken');

const { JWT_SECRET_KEY } = process.env;

const validateJWT = (req, res = response, next) => {
  const token = req.header('Authorization');

  if (!token) {
    res.status(401).json({
      ok: false,
      msg: 'Token is required',
    });
  }

  try {
    const { uid, email } = jwt.verify(token, JWT_SECRET_KEY);
    req.uid = uid;
    req.email = email;
  } catch (error) {
    error.type = 'token';
    next(error);
  }

  next();
};

module.exports = { validateJWT };
