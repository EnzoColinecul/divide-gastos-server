const { Schema, model } = require('mongoose');

const TokenSchema = new Schema({
  token: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

TokenSchema.methods.toJSON = function () {
  const { __v, _id, ...token } = this.toObject();
  token.tokenId = _id;
  return token;
};

module.exports = model('Token', TokenSchema);
