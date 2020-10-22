const express = require('express');
const userController = require('../controllers/usersController');
const router = express.Router();

router.get('/', userController.users_get);
router.get('/:id', userController.users_detail);
router.post('/', userController.users_create);
router.put('/:id', userController.users_update);
router.delete('/:id', userController.users_delete);

module.exports = router;