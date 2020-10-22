const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');

router.get('/', postsController.posts_get);
router.get('/:id', postsController.posts_details);
router.put('/:id', postsController.posts_update);
router.delete('/:id', postsController.posts_delete);

module.exports = router;