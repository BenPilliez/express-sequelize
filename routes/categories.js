const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');
const authHelper = require('../helpers/auth');

router.get('/', categoriesController.categories_get);
router.get('/:id', categoriesController.categories_details);
router.post('/', authHelper.verifToken, authHelper.checkRole, categoriesController.categories_create);
router.put('/:id', authHelper.verifToken, authHelper.checkRole, categoriesController.categories_update);
router.delete('/:id', authHelper.verifToken, authHelper.checkRole, categoriesController.categories_delete);

module.exports = router;