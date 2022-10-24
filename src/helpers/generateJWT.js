const jwt = require('jsonwebtoken');

const { JWT_SECRET_KEY } = process.env;

const generateJWT = (uid, email) => new Promise((resolve, reject) => {
  const payload = { uid, email };
  jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '2h' }, (err, token) => {
    if (err) {
      reject(new Error('token no generate'));
    }
    resolve(token);
  });
});

module.exports = { generateJWT };
