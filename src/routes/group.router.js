const { Router } = require('express');
const { check } = require('express-validator');
const { groupCreate } = require('../controller/group.controller');
const { validateJWT } = require('../middlewares/validateJWT');
const { validateFields } = require('../middlewares/validationFields');

const router = Router();

/*
1. get all user groups
2. get by id
3. create new group
4. modify group
5. delete group
*/

router.use(validateJWT);

router.get('/', (req, res) => {
  res.status(200).json({
    ok: true,
    msg: 'get all',
  });
});

router.get('/:id', (req, res) => {
  res.status(200).json({
    ok: true,
    msg: 'get by id',
  });
});

router.post('/create', [
  check('name', 'Name is required').notEmpty(),
  check('members', 'Members is required').notEmpty(),
  validateFields,
], groupCreate);

module.exports = router;
