const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoute = require('./routes/user');
require('dotenv').config();

// DB connection
mongoose.Promise = global.Promise;
mongoose.connect(
	'mongodb://localhost:27017/loginAuth',
	{
		useNewUrlParser: true,
		useFindAndModify: false,
		useCreateIndex: true
	},
	() => {
		console.log('DB connected');
	}
);

const app = express();

// middleware
app.use(cors({ credentials: true }));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// route
app.use('/api/user/', userRoute);

// error handler
app.use((req, res, next) => {
	const error = new Error('Not found');
	error.status = 404;
	next(error);
});
app.use((err, req, res, next) => {
	const error = app.get('env') === 'development' ? err : {};

	res.status(error.status || 500).json({
		error: {
			message: error.message
		}
	});
});
const port = process.env.port || 3000;
app.listen(port, () => {
	console.log(`Now listening to port: ${port}`);
});
