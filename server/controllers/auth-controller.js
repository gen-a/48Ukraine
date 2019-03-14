const mongoose = require('mongoose');
const uniqid = require('uniqid');
const validator = require('validator');
const { response } = require('../lib/response');
const User = require('../models/user-model');
const { mail } = require('../services/mail');
const { generatePassword } = require('../lib/password-generator');

/**
 * Check if user exists and register new user if not
 * @param req {object}
 * @param res {object}
 * @param next {Function}
 */
exports.email = (req, res, next) => {
  if (!req.body.email) {
    res.status(200).json(response({}, 'auth.error.missing_email', 1));
    return next();
  }
  const { email } = req.body;
  if (!validator.isEmail(email)) {
    res.status(200).json(response({ email }, 'auth.error.invalid_email', 1));
    return next();
  }
  User.find({ email })
    .then((found) => {
      if(found.length === 0){
        const password = generatePassword();
        const _id = new mongoose.Types.ObjectId();
        const user = new User({ _id, email, password });
        return user.save()
          .then(() => {
            return mail(
              process.env.MAIL_FROM,
              email,
              'You have been registered at 48 Ukraine site',
              `Please use password: ${password} to enter the site`,
              `<p>Please use password: ${password} to enter the site</p>`
            );
          })
          .then(() => {
            res.status(200).json(response( { email }, 'auth.info.password_has_been_sent', 0 ));
            next();
          });
      } else {
        return Promise.resolve()
          .then(() => {
            res.status(200).json(response( { email }, 'auth.info.please_use_password_to_enter', 0 ));
            next();
          });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
      next();
    });
};
/**
 * Check if user exists and register new user if not
 * @param req {object}
 * @param res {object}
 * @param next {Function}
 */
/*
exports.login = (req, res, next) => {
  if (!req.body.email) {
    res.status(200).json(response({}, 'auth.error.missing_email', 1));
    return next();
  }
  const { email } = req.body;
  if (!validator.isEmail(email)) {
    res.status(200).json(response({ email }, 'auth.error.invalid_email', 1));
    return next();
  }
};
*/