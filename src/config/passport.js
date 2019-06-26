const passport = require('passport');
require('./strategy/local.strategy')();


function passportConfig(app) {
  // creates these on the request
  app.use(passport.initialize());
  app.use(passport.session());

  // store user in session
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  // retrieves user from session
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
}

module.exports = passportConfig;
