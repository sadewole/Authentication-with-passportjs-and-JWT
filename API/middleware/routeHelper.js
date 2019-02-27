const joi = require('joi');

module.exports = {
	validateBody(schema) {
		return (req, res, next) => {
			const result = joi.validate(req.body, schema);
			if (result.error) return res.status(400).json(result.error);
			if (!req.value) req.value = {};

			req.value['body'] = result.value;
			next();
		};
	},
	schemas: {
		signupAuth: joi.object().keys({
			username: joi.string().required(),
			email: joi.string().email().required(),
			password: joi.string().regex(/^[a-zA-Z0-9]{5,30}$/).required(),
			confirmationPassword: joi.any().valid(joi.ref('password')).required()
		}),
		signinAuth: joi.object().keys({
			email: joi.string().email().required(),
			password: joi.string().required()
		})
	}
};
