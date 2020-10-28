const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authHelper = require('../helpers/auth');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/account',authHelper.verifToken, authController.account);

module.exports = router;
