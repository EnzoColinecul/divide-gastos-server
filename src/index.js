require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dbConnection = require('./database/config');

const app = express();

dbConnection();

app.use(cors());

app.use(express.static('public'));

app.use(express.json());

app.use('/api', require('./routes/router'));

app.listen(process.env.NODE_DOCKER_PORT, () => {
  console.log(`server on port ${process.env.NODE_DOCKER_PORT}`);
});
