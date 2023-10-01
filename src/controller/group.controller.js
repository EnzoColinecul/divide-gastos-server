const { verifyId } = require('../helpers/regex');
const Group = require('../models/Group');
const Users = require('../models/User');
const { response } = require('../routes/router');

const removeDuplicates = (array) => array.filter((item, index) => array.indexOf(item) === index);

const groupCreate = async (req, res = response) => {
  const { members } = req.body;
  const newGroup = new Group(req.body);
  const findMembers = await Users.find({ email: { $in: members } });
  try {
    // eslint-disable-next-line max-len
    const usersNotRegistered = members.filter((member) => !findMembers.some((registeredUser) => registeredUser.email === member));
    if (usersNotRegistered.length > 0) {
      return res.status(400).json({
        ok: false,
        msg: 'Member/s not registered',
        usersNotRegistered,
      });
    }

    // eslint-disable-next-line no-underscore-dangle
    let membersUserId = findMembers.map((member) => member._id.toString());
    membersUserId = removeDuplicates(membersUserId);
    newGroup.owners = [req.userId];
    newGroup.members = [req.userId, ...membersUserId];
    const group = await newGroup.save();

    res.status(200).json({
      group,
    });
  } catch (error) {
    throw new Error(error);
  }
};

const updateGroup = async (req, res = response) => {
  const { userId } = req;
  const { id } = req.params;
  const { name, description, members } = req.body;

  try {
    const group = Group.findById(id);

    if (!group) {
      return res.status(404).json({
        ok: false,
        msg: 'Group not found',
      });
    }

    if (!group.owners.includes(userId)) {
      return res.status(401).json({
        ok: false,
        msg: 'You are not the owner of this group',
      });
    }

    const findMembers = await Users.find({ email: { $in: members } });
    // eslint-disable-next-line max-len
    const usersNotRegistered = members.filter((member) => !findMembers.some((registeredUser) => registeredUser.email === member));
    if (usersNotRegistered.length > 0) {
      return res.status(400).json({
        ok: false,
        msg: 'Member/s not registered',
        usersNotRegistered,
      });
    }
    // eslint-disable-next-line no-underscore-dangle
    let membersUserId = findMembers.map((member) => member._id.toString());
    membersUserId = removeDuplicates(membersUserId);

    const newGroup = {
      name,
      description,
      members: [userId, ...membersUserId],
    };

    res.status(200).json({
      newGroup,
    });
  } catch (error) {
    throw new Error(error);
  }
};

const getGroupById = async (req, res = response) => {
  const { id } = req.params;
  try {
    if (!verifyId(id)) {
      return res.status(400).json({
        ok: false,
        msg: 'Invalid id',
      });
    }
    const getGroup = await Group.findById(id);

    if (!getGroup) {
      return res.status(404).json({
        ok: false,
        msg: 'Group not found',
      });
    }

    res.status(200).json({
      getGroup,
    });
  } catch (error) {
    throw new Error(error);
  }
};

const deleteGroupById = async (req, res = response) => {
  const { id } = req.params;
  try {
    if (!verifyId(id)) {
      return res.status(400).json({
        ok: false,
        msg: 'Invalid id',
      });
    }
    const group = await Group.findById(id);
    if (!group) {
      return res.status(404).json({
        ok: false,
        msg: 'Group not found',
      });
    }
    if (!group.owners.includes(req.userId)) {
      return res.status(401).json({
        ok: false,
        msg: 'You are not the owner of this group',
      });
    }
    await Group.deleteOne({ _id: id });
    res.status(200).json({
      ok: true,
      group,
    });
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  groupCreate,
  updateGroup,
  getGroupById,
  deleteGroupById,
};
