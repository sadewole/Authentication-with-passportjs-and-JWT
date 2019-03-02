const User = require('../model/user');
const JWT = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

const signToken = (user) => {
	return JWT.sign(
		{
			iss: 'codeSecret',
			sub: user.id,
			iat: new Date().getTime(),
			exp: new Date().setDate(new Date().getDate() + 1)
		},
		JWT_SECRET
	);
};

module.exports = {
	signup: async (req, res, next) => {
		const { email, password, username } = req.value.body;

		const user = await User.findOne({ email });
		if (user) {
			res.status(403).json({
				message: 'Email already exist'
			});
		} else {
			const newUser = await new User({ email, password, username });
			await newUser.save();

			const token = signToken(newUser);
			res.status(200).json({
				TYPE: 'POST',
				status: 200,
				message: 'Registered successfully',
				token
			});
		}
	},
	signin: async (req, res, next) => {
		if (req.user) {
			const token = signToken(req.user);

			res.status(200).json({
				TYPE: 'POST',
				status: 200,
				message: 'Login successful',
				token
			});
		}
	},
	logout: async (req, res, next) => {
		res.status(200).json({
			TYPE: 'GET',
			status: 200,
			message: 'Logout successful',
			token: ''
		});
	},
	secret: async (req, res, next) => {
		res.status(200).json({
			TYPE: 'GET',
			data: req.user,
			status: 200,
			secret: 'resource'
		});
	},
	verifyEmail: async (req, res, next) => {
		const { email } = req.value.body;

		const user = await User.findOne({ email });
		if (user) {
			const token = signToken(user);
			res.status(200).json({
				TYPE: 'GET',
				status: 200,
				message: 'Registered successfully',
				token
			});
		} else {
			res.status(403).json({
				message: 'Email do not exist'
			});
		}
	},
	verifyPassword: async (req, res, next) => {
		const user = await User.findOne();
	}
};
