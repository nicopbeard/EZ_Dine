const express = require('express');
const logger = require('morgan');
const dotenv = require('dotenv');
const chalk = require('chalk');
const mongoose = require('mongoose');
const createError = require('http-errors');
const bodyParser = require('body-parser');
const cors = require('cors')
var path = require('path');
const apiErrorHandler = require('./error/apiErrorHandler');


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
app.use(bodyParser.json());
app.use(cors());


// Set up routers for API requests
const customerRouter = require('./routes/customers');
const employeeRouter = require('./routes/employees');
const menuRouter = require('./routes/menu');

if (process.env.NODE_ENV === 'production') {
    console.log('**RUNNING ON PROD**');
    // For serving static files from React build folder
    app.use(express.static('client/build'));
} // TODO: disable logging on prod

app.use('/customers', customerRouter);
app.use('/employees', employeeRouter);
app.use('/menu', menuRouter);


app.use(apiErrorHandler);

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development


});

const port = process.env.PORT || 5000;

app.listen(port, () => `Server running on port ${port}`);

