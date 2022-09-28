require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.static('public'));

app.use(express.json());

app.listen(process.env.NODE_DOCKER_PORT, () => {
  console.log(`server on port ${process.env.NODE_DOCKER_PORT}`);
});
