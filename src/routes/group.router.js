const { Router } = require('express');
const { check } = require('express-validator');
const {
  groupCreate, updateGroup, getGroupById, deleteGroupById,
} = require('../controller/group.controller');
const { verifyJWT } = require('../helpers/generateJWT');
const { validateJWT } = require('../middlewares/validateJWT');
const { validateFields } = require('../middlewares/validationFields');

const router = Router();

router.use(validateJWT);

router.get('/:id', getGroupById);

router.post('/create', [
  check('name', 'Name is required').notEmpty(),
  check('members', 'Members is required').notEmpty(),
  validateFields,
], groupCreate);

router.put(
  '/:id',
  [
    check('name', 'Name is required').notEmpty(),
    check('members', 'Members is required').notEmpty(),
    validateFields,
    verifyJWT],
  updateGroup,
);

router.delete('/:id', deleteGroupById);

module.exports = router;
