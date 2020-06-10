const TaskController = require('../controllers/tasks');
const express = require('express');
const router = express.Router();

router.route('/tasks')
    .get(TaskController.index)
    .post(TaskController.create);

router.get('/tasks/new', TaskController.new);

router.get('/tasks/:id/edit', TaskController.edit);

router.route('/tasks/:id')
    .get(TaskController.show)
    .put(TaskController.update)
    .delete(TaskController.destroy);

module.exports = router;