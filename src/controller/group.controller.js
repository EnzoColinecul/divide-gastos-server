const Group = require('../models/Group');
const { response } = require('../routes/router');
// const { getUserById } = require('./user.controller');

const groupCreate = async (req, res = response) => {
  const group = new Group(req.body);
  try {
    // const user = getUserById(req);
    group.owners = [req.uid];
    const saveGroup = await group.save();
    res.status(200).json({
      ok: true,
      group: saveGroup,
    });
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  groupCreate,
};
