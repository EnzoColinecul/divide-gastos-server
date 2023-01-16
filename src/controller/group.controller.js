const Group = require('../models/Group');
const { response } = require('../routes/router');

const groupCreate = async (req, res = response) => {
  const { uid } = req;
  console.log(uid);
  const group = new Group(req.body);
  try {
    res.status(200).json({
      ok: true,
      msg: 'group controller',
      group,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  groupCreate,
};
