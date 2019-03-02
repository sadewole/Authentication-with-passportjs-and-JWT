const express = require('express');
const router = require('express-promise-router')();
const userController = require('../controller/user');
const { validateBody, schemas } = require('../middleware/routeHelper');
const passport = require('passport');
const passportConfig = require('../passport');

router.route('/signup').post(validateBody(schemas.signupAuth), userController.signup);
router
	.route('/signin')
	.post(validateBody(schemas.signinAuth), passport.authenticate('local', { session: false }), userController.signin);
router.route('/secret').get(passport.authenticate('jwt', { session: false }), userController.secret);
router.route('/logout').get(passport.authenticate('jwt', { session: false }), userController.logout);

module.exports = router;
