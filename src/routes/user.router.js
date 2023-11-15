const { Router } = require('express');
const { getUserById } = require('../controller/user.controller');

const router = Router();

router.get('/:id', getUserById);

module.exports = router;
