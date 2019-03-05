/** Express router providing auth related routes
 * @module routes/auth-router
 * @requires express
 */
const router = require('express').Router();
const passport = require('passport');
const { response } = require('../lib/response');
const authController = require('../controllers/auth-controller');

/**
 * @api {post} /data/auth/email Check incoming email on auth
 * @apiVersion 1.0.0
 * @apiName Email
 * @apiGroup Auth
 * @apiPermission anyone
 *
 * @apiParam (Request body) {String} Object {email}
 *
 * @apiExample {js} Example usage:
 * const data = {
 *   "email": "email@examles.com"
 * }
 *
 * @apiSuccess (Success 200) {String} message auth.error.missing_email
 * @apiSuccess (Success 200) {String} message auth.error.invalid_email
 * @apiSuccess (Success 200) {String} message auth.info.password_has_been_sent
 * @apiSuccess (Success 200) {String} message auth.info.please_use_password_to_enter
 *
 * @apiSuccessExample {json} Success response:
 *     HTTPS 200 OK
 *     {
 *      "message": "auth.error.missing_email",
 *      "data": "{email}"
 *      "error": 1
 *    }
 */
router.post('/email', authController.email);

/**
 * @api {post} /data/auth/login Enter login and password
 * @apiVersion 1.0.0
 * @apiName Login
 * @apiGroup Auth
 * @apiPermission anyone
 *
 * @apiParam (Request body) {String} Object {email, password}
 *
 * @apiExample {js} Example usage:
 * const data = {
 *   "email": "email@examles.com",
 *   "password": "password",
 *   "remember": 0
 * }
 *
 * @apiSuccess (Success 200) {String} message auth.info.missing_credentials
 * @apiSuccess (Success 200) {String} message auth.error.incorrect_user_name
 * @apiSuccess (Success 200) {String} message auth.error.incorrect_password
 * @apiSuccess (Success 200) {String} message auth.info.you_have_been_logged_in
 *
 * @apiSuccessExample {json} Success response:
 *     HTTPS 200 OK
 *     {
 *      "message": "auth.error.incorrect_user_name",
 *      "data": "{}"
 *      "error": 0
 *    }
 */
router.post('/login', (req, res, next) => {
  passport.authenticate('local', { badRequestMessage: 'auth.info.missing_credentials' }, (err, user, info) => {
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
        // Cookie expires after 30 days
        req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000;
      } else {
        // Cookie expires at end of session
        req.session.cookie.expires = false;
      }
      res.status(200).json(response({}, 'auth.info.you_have_been_logged_in', 0));
      return next();
    });
    return null;
  })(req, res, next);
  return null;
});

/**
 * @api {get} /data/auth/logout Logout function
 * @apiVersion 1.0.0
 * @apiName Logout
 * @apiGroup Auth
 * @apiPermission authenticated user
 *
 * @apiSuccess (Success 200) {String} message auth.info.you_have_been_logged_out
 *
 * @apiSuccessExample {json} Success response:
 *     HTTPS 200 OK
 *     {
 *      "message": "auth.info.you_have_been_logged_out",
 *      "data": "{}"
 *      "error": 0
 *    }
 */
router.get('/logout', (req, res) => {
  req.logout();
  res.status(200).json(response({}, 'auth.info.you_have_been_logged_out', 0));
});

module.exports = router;
