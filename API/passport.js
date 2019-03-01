const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./model/user');
const { JWT_SECRET } = require('./config');

// JWT strategy
passport.use(
	'jwt',
	new JwtStrategy(
		{
			jwtFromRequest: ExtractJwt.fromHeader('authorization'),
			secretOrKey: JWT_SECRET
		},
		async (payload, done) => {
			try {
				const user = await User.findById(payload.sub);

				if (!user) return done(null, false);

				done(null, user);
			} catch (err) {
				done(err, false);
			}
		}
	)
);

// LOCAL strategy
passport.use(
	'local',
	new LocalStrategy(
		{
			usernameField: 'email'
		},
		async (email, password, done) => {
			try {
				// find user
				const user = await User.findOne({ email });

				if (!user) return done(null, false);

				// check if the passsword is correct
				const isMatch = await user.isValidPassword(password);
				if (!isMatch) return done(null, false);

				// validate user
				done(null, user);
			} catch (err) {
				done(err, null);
			}
		}
	)
);
