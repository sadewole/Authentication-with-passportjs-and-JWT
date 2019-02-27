const express = require('express');
const router = require('express-promise-router')();
const userController = require('../controller/user');
const { validateBody, schemas } = require('../middleware/routeHelper');

router.route('/signup').post(validateBody(schemas.signupAuth), userController.signup);
router.route('/signin').post(validateBody(schemas.signinAuth), userController.signin);

module.exports = router;
