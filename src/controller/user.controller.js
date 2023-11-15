const User = require('../models/User');
const { response } = require('../routes/router');

const getUserById = async (req, res = response, next) => {
  try {
    const uid = req.params.id;
    const user = await User.findOne({ uid });
    user.password = null;
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: 'User not found',
      });
    }
    return res.status(200).json({
      ok: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUserById };
