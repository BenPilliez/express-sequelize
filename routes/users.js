const express = require('express');
const userController = require('../controllers/usersController');
const router = express.Router();

router.get('/', userController.users_get);
router.get('/:id', userController.users_detail);

module.exports = router;