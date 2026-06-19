const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');

require('dotenv').config();

const dashboardRoutes = require('./routes/dashboardRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

const MONGO_URI = process.env.npm_lifecycle_event === 'dev' 
  ?  process.env.MONGO_URI_LOCAL 
  :  process.env.MONGO_URI_USER
;

// SETUP INITIALIZATION
app.set('view engine', 'ejs');

// CONNECT TO MONGODB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('\n\nError while connecting to DB: ', err))
  ;


// CONNECT REQUEST HANDLERS TO ROUTE HANDLERS
app.get('/', (req, res) => {
  res.status(200).render('home', {})
});

// TESTING CODE ONLY
if (process.env.npm_lifecycle_event === 'dev' ) {
  app.get('/dashboard', dashboardRoutes);
  app.use('/', authRoutes);     // Registration and login pages
}
else {
  // FIRST AUTHENTICATE, THEN PROCESS REQUESTS
  app.use('/', authRoutes);     // Registration and login pages
  app.get('/dashboard', dashboardRoutes); // PROD
}

// Send a 404 for any other route not defined
app.use((_, res) => {
  res.status(404).send('404 Not Found');
});

// Listen to specific port
app.listen(PORT, () => {
  console.log(`>> Server is running at 'http://localhost:${PORT}'.`);
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