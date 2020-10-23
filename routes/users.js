const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');
const authHelper = require('../helpers/auth');

router.get('/', userController.users_get);
router.get('/:id', userController.users_detail);
router.put('/:id', authHelper, userController.users_update);
router.delete('/:id', authHelper, userController.users_delete);

module.exports = router;