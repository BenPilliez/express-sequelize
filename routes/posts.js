const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');
const authHelper = require('../helpers/auth');
const multer = require('../helpers/multer-config');

router.get('/', postsController.posts_get);
router.get('/:id', postsController.posts_details);
router.post('/', authHelper.verifToken, multer, postsController.posts_create);
router.put('/:id', authHelper.verifToken, postsController.posts_update);
router.delete('/:id', authHelper.verifToken, postsController.posts_delete);

module.exports = router;
