// const isDevAuthBypass = false //process.env.npm_lifecycle_event === 'dev';

const devUser = {
  _id: '000000000000000000000001',
  username: 'devuser',
  email: 'dev@example.com',
};

function ensureAuthenticated(req, res, next) {
  // if (isDevAuthBypass) {
  //   req.user = req.user || devUser;
  //   return next();
  // }

  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }

  res.redirect('/login');
}

function ensureGuest(req, res, next) {
  // if (isDevAuthBypass) {
  //   return next();
  // }

  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return next();
  }

  res.redirect('/dashboard');
}

module.exports = {
  ensureAuthenticated,
  ensureGuest,
};
