const { Schema, model } = require('mongoose');

const groupSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  owners: {
    type: Array,
    required: false,
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

module.exports = model('Group', groupSchema);
