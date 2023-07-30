require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dbConnection = require('./database/config');

const app = express();

dbConnection();

app.use(express.static('public'));

app.use(express.json());

app.use(cors());

app.use('/api', require('./routes/router'));

app.listen(process.env.NODE_DOCKER_PORT, '172.19.0.3');

module.exports = app;
