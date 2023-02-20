const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  groups: {
    type: Array,
    default: null,
  },
  groupsOwner: {
    type: Array,
    default: null,
  },
  friends: {
    type: Array,
    default: null,
  },
  balances: {
    type: Array,
    default: null,
  },
});

module.exports = model('User', UserSchema);
