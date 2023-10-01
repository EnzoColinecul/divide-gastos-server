const express = require('express');
const { handlingErrors } = require('../middlewares/handlingErrors');

const app = express();

app.use('/auth', require('./auth.router'));

app.use('/group', require('./group.router'));

app.use('/user', require('./user.router'));

app.use(handlingErrors);

module.exports = app;
