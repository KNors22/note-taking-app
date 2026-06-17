const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3030;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/test';

// SETUP INITIALIZATION
app.set('view engine', 'ejs');

// CONNECT TO MONGODB
mongoose
    .connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Error while connecting to DB: ', err))
;

// Send a 404 for any other route not defined
app.use((_, res) => {
    res.status(404).send('404 Not Found');
});

// Listen to specific port
app.listen(PORT, () => {
    console.log(`>> Server is running on 'http://localhost:${PORT}'. Yay!`);
});

// Listen for the SIGINT signal (Ctrl+C) to gracefully close the MongoDB connection
process.on('SIGINT', async () => {
  try {
    await mongoose.disconnect();
    console.log('\n >> MongoDB connection closed. Exiting application.');
    process.exit(0); // Exit the process with a success code
  } catch (err) {
    console.error('\n >> Error while disconnecting from MongoDB:', err);
    process.exit(1); // Exit the process with an error code
  }
  finally {
    console.log('\t‼️ MONGODB SERVICE IS STILL RUNNING ‼️');
  }
});

module.exports = app;

/**
 * var cookieParser = require('cookie-parser');      // Middleware for parsing cookies
 * var logger = require('morgan');     // Middleware for logging HTTP requests
 *
 * // Importing index + users route
 * var indexRouter = require('./routes/index');   
 * var usersRouter = require('./routes/users');   
 *
 * app.use(logger('dev'));       // Using logger middleware for development
 *
 * // Using routers for respective path
 * app.use('/', indexRouter);          
 * app.use('/users', usersRouter);  
 */