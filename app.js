const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const path = require('path');

const session = require('express-session');
const passport = require('./middleware/passport');

require('dotenv').config();

const dashboardRoutes = require('./routes/dashboardRoutes');
const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes');
const collectionRoutes = require('./routes/collectionRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

const MONGO_URI = process.env.npm_lifecycle_event === 'dev' 
  ?  process.env.MONGO_URI_LOCAL 
  :  process.env.MONGO_URI_USER
;

// SETUP INITIALIZATION
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));   // Allows for PUT and DELETE in HTML forms
app.use(express.static(path.join(__dirname, 'public')));


// CONFIGURE AUTH SESSION USING PASSPORT
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: 'lax', 
    secure: process.env.npm_lifecycle_event !== 'dev',  // ‼️ MODIFY BEFORE PRODUCTION!!
  },
}));

app.use(passport.initialize());
app.use(passport.session());


// CONNECT TO MONGODB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('>> Connected to MongoDB\n'))
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

app.use('/notes', noteRoutes);
app.use('/collections', collectionRoutes);
app.use('/user', userRoutes);

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
 * app.use(logger('dev'));       // Using logger middleware for development
 */
