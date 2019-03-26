const { response } = require('../lib/response');
const User = require('../models/user-model');
const { filterByKeys } = require('../lib/filter-by-keys');
const { ResourceNotFoundError } = require('../lib/errors');

/**
 * Find user by query
 * @param where
 * @return {Promise}
 * @throws {ResourceNotFoundError} - if user not found
 */
const findUser = (where) => {
  return User.findOne(where)
    .then((found) => {
      if (found === null) {
        throw new ResourceNotFoundError('user.error.notFound', where);
      }
      return found;
    });
};
/**
 * Update password for current user by email stored in session
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
exports.updatePassword = (req, res, next) => {
  findUser({ email: req.user.email })
    .then((found) => {
      const user = new User(found);
      user.password = req.body.password;
      return user.save();
    })
    .then(() => {
      res.status(200).json(response({}, 'user.info.passwordHasBeenStored', 0));
      next();
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
exports.updateProfile = (req, res, next) => {

  const { email } = req.user;
  let data = {};

  filterByKeys(req.body, ['firstName', 'lastName', 'city', 'zip', 'address', 'phone'])
    .then((filtered) => {
      data = filtered;
      return User.updateOne({ email }, { $set: data });
    })
    .then((result) => {
      const { n, nModified } = result;
      res.status(200).json(response({ n, nModified, data }, 'user.info.theProfileHasBeenUpdated'));
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
