const { Router } = require('express');
const { check } = require('express-validator');
const {
  userLogin, userRegister, renewToken, verifyEmail, resendEmail,
} = require('../controller/auth.controller');
const { validateFields } = require('../middlewares/validationFields');
const { validateJWT, validateJWTparams } = require('../middlewares/validateJWT');

const router = Router();

router.post(
  '/login',
  [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password must be greater than or equal to 8 character').isLength({ min: 7 }),
    validateFields,
  ],
  userLogin,
);

router.post(
  '/register',
  [
    check('firstName', 'First Name is required').isString(),
    check('lastName', 'Last Name is required').isString(),
    check('email', 'Email is requiredx').isEmail(),
    check('password', 'Password must be greater than or equal to 8 character').isLength({ min: 7 }),
    check('password', 'Must include numbers. Use a combination of uppercase and lowercase letters. Includes special characters.').isStrongPassword(),
    validateFields,
  ],
  userRegister,
);

router.post(
  '/resend-email/:email',
  [
    check('email', 'Email is required').isEmail(),
    validateFields,
  ],
  resendEmail,
);

router.post(
  '/verify-email/:userId/:token',
  [
    check('userId', 'User Id is required').isString(),
    check('token', 'Token is required').isString(),
    validateFields,
    validateJWTparams,
  ],
  verifyEmail,
);

router.get('/renew', validateJWT, renewToken);

module.exports = router;
