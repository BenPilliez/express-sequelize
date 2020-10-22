const express = require('express');
const router = express.Router();
const tagsController = require('../controllers/tagsController');

router.get('/', tagsController.tags_get);
router.get('/:id', tagsController.tags_detail);
router.post('/',tagsController.tags_create);
router.put('/:id', tagsController.tags_update);
router.delete('/:id', tagsController.tags_delete);

module.exports = router;
