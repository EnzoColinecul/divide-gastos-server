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
  userType: {
    type: String,
    required: true,
    default: 'standard',
    enum: ['standard', 'premium'],
  },
  verificatedEmail: {
    type: Boolean,
    required: true,
    default: false,
  },
});

UserSchema.methods.toJSON = function () {
  const {
    __v, password, _id, ...user
  } = this.toObject();
  user.uid = _id;
  return user;
};

module.exports = model('User', UserSchema);
