const CategoryController = require('../controllers/categorias');
const express = require('express');
const router = express.Router();

router.route('/categorys')
    .get(CategoryController.index);

router.get('/categorys/new', CategoryController.new);

router.get('/categorys/:id/edit', CategoryController.edit);

// router.route('/categorys/:id')
//     .get(CategoryController.show)
//     .put(CategoryController.update)
//     .delete(CategoryController.destroy);

module.exports = router;