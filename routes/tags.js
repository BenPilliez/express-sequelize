const express = require('express');
const router = express.Router();
const tagsController = require('../controllers/tagsController');
const authHelper = require('../helpers/auth');

router.get('/', tagsController.tags_get);
router.get('/:id', tagsController.tags_detail);
router.post('/',authHelper.verifToken,tagsController.tags_create);
router.put('/:id',authHelper.verifToken,authHelper.checkRole, tagsController.tags_update);
router.delete('/:id',authHelper.verifToken,authHelper.checkRole, tagsController.tags_delete);

module.exports = router;
