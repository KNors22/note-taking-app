var express = require('express');
//var path = require('path');
//var cookieParser = require('cookie-parser');      // Middleware for parsing cookies
//var logger = require('morgan');     // Middleware for logging HTTP requests

// Importing index + users route
var indexRouter = require('./routes/index');   
var usersRouter = require('./routes/users');   
var app = express();

//app.use(logger('dev'));       // Using logger middleware for development

// Using routers for respective path
app.use('/', indexRouter);          
app.use('/users', usersRouter);        
module.exports = app;