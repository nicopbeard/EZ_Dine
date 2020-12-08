const express = require('express');
const logger = require('morgan');
const dotenv = require('dotenv');
const chalk = require('chalk');
const mongoose = require('mongoose');
const createError = require('http-errors');
const bodyParser = require('body-parser');
const cors = require('cors')
var path = require('path');

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

// TODO: fix view engine/figure out wtf a view engine is
// view engine setup
app.set('views', path.join(__dirname, 'client/src/components'));
app.set('view engine', 'js');

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
    // For serving static files from React build folder
    console.log('******************* ENV IS PROD');
    app.use(express.static('client/build'))
    // app.get('*', (req, res) => {
    //     console.log('inside static handler');
    //     console.log(res);
    //     res.sendFile(path.join(__dirname, 'client/build'))
    // });
}

// TODO: remove /api to see if it actually is building in heroku
app.use('/api/customers', customerRouter);
app.use('/api/employees', employeeRouter);
app.use('/api/menu', menuRouter);







// TODO: there is probably a better way to handle errors
app.use((req, res, next) => {
    next(createError(404));
});

// TODO: fix this error handler, res.render is broken -> I changed it to res.json, but we should display something better
// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
    });
});

const port = process.env.PORT || 5000;

app.listen(port, () => `Server running on port ${port}`);

