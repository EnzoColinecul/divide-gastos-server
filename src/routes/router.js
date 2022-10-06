const express = require('express');

const app = express();

app.use('/auth', require('./auth.route'));

module.exports = app;
