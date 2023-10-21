const bcrypt = require('bcryptjs');
const { response } = require('express');
const User = require('../models/User');
const Group = require('../models/Group');
const { generateJWT } = require('../helpers/generateJWT');
const sendMail = require('../services/email/emailSender');

const userLogin = async (req, res = response, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({
        ok: false,
        msg: 'Email or password is invalid',
      });
    }

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      res.status(400).json({
        ok: false,
        msg: 'Email or password is invalid',
      });
    }

    const token = await generateJWT(user.id, user.email);
    const groups = await Group.find({ members: user.id });
    user.groups = groups;
    user.groupsOwner = groups.filter((group) => group.owners.includes(user.id));
    res.status(200).json({
      user,
      token,
    });
    return next();
  } catch (error) {
    error.type = 'login';
    return next(error);
  }
};

const userRegister = async (req, res = response, next) => {
  const {
    email, password, passwordConfirm,
  } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      res.status(400).json({
        ok: false,
        msg: 'User already exists',
      });
    }

    if (password !== passwordConfirm) {
      res.status(400).json({
        ok: false,
        msg: 'Passwords must be equals',
      });
    }

    user = new User(req.body);
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    const token = await generateJWT(user.id, user.email);
    const emailLink = `${process.env.BASE_URL}/verify-email/${user.id}/${token}}`;
    const sendEmail = await sendMail(
      email,
      'Divide Gastos App - Confirm your email',
      `Click on the link to confirm your email: ${emailLink}`,
    );

    if (!sendEmail) {
      return res.status(500).json({
        ok: false,
        msg: 'Error sending verification email',
      });
    }
    await user.save();
    res.status(201).json({
      ok: true,
      userId: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
    });
  } catch (error) {
    error.type = 'register';
    next(error);
  }
};

const resendEmail = async (req, res = response, next) => {
  const { email } = req.params;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({
        ok: false,
        msg: 'User not found',
      });
    }

    if (user.verificatedEmail) {
      res.status(400).json({
        ok: false,
        msg: 'Email already verified',
      });
    }

    const token = await generateJWT(user.id, user.email);
    const emailLink = `${process.env.BASE_URL}/verify-email/${user.id}/${token}}`;
    const sendEmail = await sendMail(
      email,
      'Divide Gastos App - Confirm your email',
      `Click on the link to confirm your email: ${emailLink}`,
    );

    if (!sendEmail) {
      return res.status(500).json({
        ok: false,
        msg: 'Error sending verification email',
      });
    }
    res.status(200).json({
      ok: true,
      msg: 'Email sent',
    });
  } catch (error) {
    error.type = 'resendEmail';
    next(error);
  }
};

const verifyEmail = async (req, res = response, next) => {
  try {
    const { userId, token } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      res.status(400).json({
        ok: false,
        msg: 'User not found',
      });
    }

    if (user.verificatedEmail) {
      res.status(400).json({
        ok: false,
        msg: 'Email already verified',
      });
    }

    user.verificatedEmail = true;
    await user.save();
    res.status(200).json({
      ok: true,
      msg: 'Email verified',
    });
  } catch (error) {
    error.type = 'verifyEmail';
    next(error);
  }
};

const renewToken = async (req, res = response, next) => {
  const { userId, email } = req;
  try {
    const token = await generateJWT(userId, email);
    res.status(200).json({
      ok: true,
      userId,
      email,
      token,
    });
  } catch (error) {
    error.type = 'renew';
    next(error);
  }
};

module.exports = {
  userLogin,
  userRegister,
  renewToken,
  verifyEmail,
  resendEmail,
};
