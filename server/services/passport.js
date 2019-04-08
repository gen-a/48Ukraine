const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user-model');

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  (username, password, done) => {
    User.findOne({ email: username })
      .then((user) => {
        if (!user) {
          return done(null, false, { message: 'auth.error.incorrectUserName' });
        }
        if (!user.comparePassword(password)) {
          return done(null, false, { message: 'auth.error.incorrectPassword' });
        }
        return done(null, user);
      })
      .catch(console.log);
  }
));

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id)
    .then((user) => {
      cb(null, user === null ? false : user.toJSON());
    })
    .catch(console.log);
});
