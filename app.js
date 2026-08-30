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

const generateSampleData = require('./seeders/demo');

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

const MONGO_URI = isProduction
  ? process.env.MONGO_URI
  : process.env.MONGO_URI_LOCAL || process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error('Missing MongoDB connection string. Set MONGO_URI for production or MONGO_URI_LOCAL for development.');
}

if (!process.env.SESSION_SECRET) {
  throw new Error('Missing SESSION_SECRET environment variable.');
}

// SETUP INITIALIZATION
app.set('view engine', 'ejs');

if (isProduction) {
  app.set('trust proxy', 1);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
    secure: isProduction,
  },
}));

app.use(passport.initialize());
app.use(passport.session());

// Make authentication and route context available to every EJS view.
app.use((req, res, next) => {
  res.locals.currentUser = req.user || null;
  res.locals.currentPath = req.path;
  next();
});


// CONNECT TO MONGODB
mongoose
  .connect(MONGO_URI, { serverSelectionTimeoutMS: 5000 })
  .then(async () => {
    console.log('>> Connected to MongoDB');

    if (!isProduction && process.env.npm_lifecycle_event === 'dev') {
      await generateSampleData();
    }

  })
  .catch((err) => {
    console.error('>> Error while connecting to DB...\n', err);
    process.exit(1);
  })
;

// CONNECT REQUEST HANDLERS TO ROUTE HANDLERS
app.get('/', (req, res) => {
  res.status(200).render('home', {})
});

// FIRST AUTHENTICATE, THEN PROCESS REQUESTS
app.use('/', authRoutes);     // Registration and login pages
app.get('/dashboard', dashboardRoutes);

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
});

module.exports = app;

/**
 * var cookieParser = require('cookie-parser');      // Middleware for parsing cookies
 * var logger = require('morgan');     // Middleware for logging HTTP requests
 *
 * app.use(logger('dev'));       // Using logger middleware for development
 */
