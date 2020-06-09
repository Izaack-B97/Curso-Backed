const SessionsController = require('../controllers/sessions');

const express = require('express');
const router = express.Router();

router.route('/sessions')
    .get(SessionsController.new)
    .post(SessionsController.create)
    .delete(SessionsController.destroy);


module.exports = router;