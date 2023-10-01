const { Schema, model } = require('mongoose');

const GroupSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
    default: null,
  },
  owners: {
    type: Array,
    required: true,
  },
  members: {
    type: Array,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

GroupSchema.methods.toJSON = function () {
  const {
    __v, _id, ...group
  } = this.toObject();
  group.groupId = _id;
  return group;
};

module.exports = model('Group', GroupSchema);
