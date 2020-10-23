const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');
const authHelper = require('../helpers/auth');

router.get('/', authHelper.verifToken, authHelper.checkRole, userController.users_get);
router.get('/:id', userController.users_detail);
router.put('/:id', authHelper.verifToken, userController.users_update);
router.delete('/:id', authHelper.verifToken, userController.users_delete);

module.exports = router;