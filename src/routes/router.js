const express = require('express');
const { handlingErrors } = require('../middlewares/handlingErrors');

const app = express();

app.use('/auth', require('./auth.router'));

app.use(handlingErrors);

module.exports = app;
