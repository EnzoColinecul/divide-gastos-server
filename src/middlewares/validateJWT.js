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
    const { userId, email } = jwt.verify(token, JWT_SECRET_KEY);
    req.userId = userId;
    req.email = email;
  } catch (error) {
    error.type = 'token';
    next(error);
  }

  next();
};

const validateJWTparams = (req, res = response, next) => {
  const { token } = req.params;

  try {
    jwt.verify(token, JWT_SECRET_KEY, (err) => {
      if (err) {
        res.status(401).json({
          ok: false,
          msg: 'Invalid Link',
        });
      }
    });
  } catch (error) {
    error.type = 'token';
    next(error);
  }
  next();
};

module.exports = { validateJWT, validateJWTparams };
