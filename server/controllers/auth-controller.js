const mongoose = require('mongoose');
const uniqid = require('uniqid');
const validator = require('validator');
const { response } = require('../lib/response');
const User = require('../models/user-model');
const { generatePassword } = require('../lib/password-generator');
const { sendRegistrationLetter } = require('../letters/send-registration-letter');
const { sendAccessLetter } = require('../letters/send-access-letter');

const VISA_EXPIRATION_TIME = 60 * 60 * 24 * 1000;

/**
 * Enter the site with temporary visa
 * It check if visa is valid. If it is OK enter the site. Clear used visa data.
 * @param req
 * @param res
 * @param next
 */
exports.requestAccessWithVisa = (req, res, next) => {
  const { visa } = req.params;
  const visaExpirationDate = (new Date()).getTime();

  User.findOne({ visa, visaExpirationDate: { $gt: visaExpirationDate } })
    .then((found) => {
      if (found === null) {
        res.status(200).json(response({}, 'auth.error.noValidEntryFoundByVisa', 1));
        return next();
      }
      req.login(found, (err) => {
        if (err) {
          res.status(200).json(response({}, 'auth.error.failedLogInWithVisa', 1));
          return next();
        }
        return null;
      });

      const { visa, visaExpirationDate, ...otherData } = found;
      const { email } = found;
      return User.updateOne({ email }, { $set: { visa: '', visaExpirationDate: 0 } })
        .then(() => {
          res.status(200).json(response({ otherData }, 'auth.info.youHaveBeenLoggedIn', 0));
          return next();
        });
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
exports.requestAccess = (req, res, next) => {
  const { email } = req.body;
  const visa = uniqid();
  const visaExpirationDate = (new Date()).getTime() + VISA_EXPIRATION_TIME;

  User.updateOne({ email }, { $set: { visa, visaExpirationDate } })
    .then((result) => {
      if (result.nModified > 0) {
        sendAccessLetter(email, visa, visaExpirationDate)
          .then(() => {
            res.status(200).json(response({ email }, 'auth.info.accessLetterHasBeenSent', 0));
            next();
          });
      } else {
        res.status(200).json(response({ email }, 'auth.error.noValidEntryFound', 1));
        next();
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
exports.email = (req, res, next) => {
  const { email } = req.body;
  if (!validator.isEmail(email)) {
    res.status(200).json(response({ email }, 'auth.error.invalidEmail', 1));
    return next();
  }
  User.findOne({ email })
    .then((found) => {
      if (found === null) {
        const password = generatePassword();
        const _id = new mongoose.Types.ObjectId();
        const user = new User({ _id, email, password });
        return user.save()
          .then(() => {
            sendRegistrationLetter(email, password)
              .then(() => {
                res.status(200).json(response({ email, isNew: true }, 'auth.info.passwordHasBeenSent', 0));
                return next();
              });
          });
      } else {
        return Promise.resolve()
          .then(() => {
            res.status(200).json(response({ email, isNew: false }, 'auth.info.pleaseUsePasswordToEnter', 0));
            return next();
          });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
      next();
    });
};
