const mongoose = require('mongoose');

const {
  DB_HOST, DB_NAME, DB_PORT, DB_USER, DB_PASSWORD,
} = process.env;

const uri = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`;

const dbConnection = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = dbConnection;
