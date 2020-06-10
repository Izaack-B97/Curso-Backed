const CategoryController = require('../controllers/categorias');
const express = require('express');
const router = express.Router();

router.route('/categories')
    .get(CategoryController.index)
    .post(CategoryController.create);

router.route('/categories/new')
    .get(CategoryController.new);

router.route('/categories/:id/edit')
    .get(CategoryController.edit);

router.route('/categories/:id')
    .get(CategoryController.show)
    .put(CategoryController.update)
    .delete(CategoryController.destroy);


module.exports = router;