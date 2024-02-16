// Import Express Dependencies
let createError = require('http-errors');
let express = require('express');
let path = require('path');
const mongoose = require("mongoose");
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let favicon = require('serve-favicon')

// Define routers
let adminRouter = require('./routes/admin');
let publicRouter = require('./routes/public');

let app = express();

// load env
require("dotenv").config();

//connect mongo
const db = process.env.MONGO_URI
// setup favicon
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRouter);
app.use('/', publicRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
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

module.exports = app;
mongoose.connect(db, { useNewUrlParser: true });