const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');

router.get('/', categoriesController.categories_get);
router.get('/:id', categoriesController.categories_details);
router.post('/', categoriesController.categories_create);
router.put('/:id', categoriesController.categories_update);
router.delete('/:id', categoriesController.categories_delete);

module.exports = router;