const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');
const authHelper = require('../helpers/auth');

router.get('/', postsController.posts_get);
router.get('/:id', postsController.posts_details);
router.post('/',authHelper.verifToken, postsController.posts_create);
router.put('/:id',authHelper.verifToken, postsController.posts_update);
router.delete('/:id',authHelper.verifToken, postsController.posts_delete);

module.exports = router;