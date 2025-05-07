const jwt = require('jsonwebtoken');

const { JWT_SECRET_KEY } = process.env;

const generateJWT = (userId, email) => new Promise((resolve, reject) => {
  const payload = { userId, email };
  jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '2h' }, (err, token) => {
    if (err) {
      reject(new Error('token no generate'));
    }
    resolve(token);
  });
});

const verifyJWT = (token) => new Promise((resolve, reject) => {
  jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      reject(new Error('token no valid'));
    }
    resolve(decoded);
  });
});

module.exports = { generateJWT, verifyJWT };
