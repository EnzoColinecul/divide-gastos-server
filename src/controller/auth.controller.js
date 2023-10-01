const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateJWT } = require('../helpers/generateJWT');
const Group = require('../models/Group');

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
    await user.save();

    const token = await generateJWT(user.id, user.email);

    res.status(201).json({
      ok: true,
      userId: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      token,
    });
  } catch (error) {
    error.type = 'register';
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
};
