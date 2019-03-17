const mongoose = require('mongoose');
const uniqid = require('uniqid');
const { response, mongooseErrorToResponse } = require('../lib/response');
const User = require('../models/user-model');
const { mail } = require('../services/mail');
const { filterByKeys } = require('../lib/filter-by-keys');

/**
 * Add new user to database
 * @param req {object}
 * @param res {object}
 * @param next {Function}
 */
exports.add = function addNewUser(req, res, next) {
  if (!req.body.email || !req.body.password) {
    res.status(200).json(response({}, 'Invalid incoming data', 1));
    next();
  } else {
    (new User({
      _id: new mongoose.Types.ObjectId(),
      password: req.body.password,
      email: req.body.email
    })).save()
      .then((result) => {
        res.status(200).json(response(result.toJSON()));
        next();
      })
      .catch((err) => {
        res.status(200).json(mongooseErrorToResponse(err));
        next();
      });
  }
};
/**
 * Get user by id
 * @param req {object}
 * @param res {object}
 * @param next {Function}
 */
exports.findById = function getUserById(req, res, next) {
  User.find({ _id: new mongoose.Types.ObjectId(req.params.id) })
    .then((result) => {
      if (result.length > 0) {
        res.status(200).json(response(result[0]));
      } else {
        res.status(404).json(response({}, 'No valid entry found', 1));
      }
      next();
    })
    .catch((err) => {
      res.status(500).json({ error: err });
      next();
    });
};
/**
 * Get all users
 * @param req {object}
 * @param res {object}
 * @param next {Function}
 */
exports.find = function getAllUsers(req, res, next) {
  User.find()
    .then((result) => {
      res.status(200).json(response(result));
      next();
    })
    .catch((err) => {
      res.status(500).json({ error: err });
      next();
    });
};


/**
 * Update password for current user by email stored in session
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
exports.updatePassword = function updateCurrentUserPassword(req, res, next){
  if (!req.user || !req.user.email || !req.body.password) {
    res.status(200).json(response({}, 'Required data is missing', 1));
    return next();
  }
  const { email } = req.user;
  User.find({ email })
    .then((found) => {
      if (found.length === 0) {
        res.status(200).json(response({}, 'No valid entry found', 1));
        return next();
      }
      const user = new User(found[0]);
      user.password = req.body.password;
      return user.save()
        .then(() => {
          res.status(200).json(response({}, 'New password has been saved', 0));
          next();
        });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
      next();
    });
};
/**
 * Update user data
 * @param req {object}
 * @param res {object}
 * @param next {Function}
 */
exports.update = function updateUserData(req, res, next) {

  const data = filterByKeys(
    req.body,
    ['firstName', 'lastName', 'city', 'zip', 'address', 'phone']
  );
  User.updateOne({ _id: req.user.id }, { $set: data })
    .then((result) => {
      if (result) {
        res.status(200).json(response(data));
      } else {
        res.status(404).json(response({}, 'No valid entry found', 1));
      }
      next();
    })
    .catch((err) => {
      res.status(500).json({ error: err });
      next();
    });
};
/**
 * Show profile information of stored in session user
 * @param req
 * @param res
 * @param next
 */
exports.profile = function userProfile(req, res, next) {
  res.status(200).json(response(req.user));
  next();
};
