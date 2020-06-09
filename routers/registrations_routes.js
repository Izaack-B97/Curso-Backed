const RegistrationControllers = require('../controllers/registrations');

const express = require('express');
const router = express.Router();

router.get('/singup', RegistrationControllers.new);

router.route('/users')
    .get(RegistrationControllers.users)
    .post(RegistrationControllers.create);

module.exports = router;