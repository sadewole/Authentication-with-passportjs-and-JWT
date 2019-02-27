const User = require('../model/user');

module.exports = {
	signup: async (req, res, next) => {
		console.log(req.value.body);
	},
	signin: async (req, res, next) => {
		console.log(req.value.body);
	}
};
