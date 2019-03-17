const router = require('express').Router();
const passport = require('passport');

const {response} = require('../lib/response');
const usersController = require('../controllers/users-controller');
/*
router.get('/', userController.find);

router.post('/', userController.add);
*/
router.put('/profile', usersController.update);
router.put('/password', usersController.updatePassword);

router.get('/profile',
  require('connect-ensure-login').ensureLoggedIn('/users/auth'),
  usersController.profile);

/*
router.post('/auth', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      res.status(200).json(response(info.data, info.message, 1));
      return next();
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      if (req.body.remember) {
        req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // Cookie expires after 30 days
      } else {
        req.session.cookie.expires = false; // Cookie expires at end of session
      }
      res.status(200).json(response({}, 'You have been logged in', 0));
      return next();
    });
  })(req, res, next);
});



router.get('/logout', (req, res) => {
  req.logout();
  res.status(200).json(response({}, 'You have been logged out', 0));
});

router.post('/is-authenticated',  (req, res) => {
  res.status(200).json(response({ isAuthenticated: !!req.user }, '', 0));
});
*/
module.exports = router;
