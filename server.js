const express = require('express');
const logger = require('morgan');
const dotenv = require('dotenv');
const chalk = require('chalk');
const mongoose = require('mongoose');
const createError = require('http-errors');


const customerRouter = require('./routes/customers');
const employeeRouter = require('./routes/employees');

// NOTE: you must copy .env.example and name it .env before adding database credentials
dotenv.config({ path: '.env' });

const app = express();

/**
 * Connect to MongoDB.
 */
mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', (err) => {
	console.error(err);
	console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
	process.exit();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set up routers:
app.use('/api/customers', customerRouter);
app.use('/api/employees', employeeRouter);

// TODO: there is probably a better way to handle errors
app.use((req, res, next) => {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);
