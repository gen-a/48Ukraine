const mongoose = require('mongoose');
const User = require('../models/user-model');

mongoose.set('useCreateIndex', true);

/**
 * New temporary User data
 * @type {{password: string, firstName: string, lastName: string, email: string}}
 */
exports.data = {
  password: 'somePassword',
  firstName: 'john',
  lastName: 'smith',
  email: 'johnsmith@gmail.om'
};
/**
 * Create temporary user
 * @returns {*}
 */
exports.create = () => {
  const user = new User({
    ...exports.data,
    _id: new mongoose.Types.ObjectId()
  });
  return user.save();
};
/**
 * Remove temporary user
 * @returns {*}
 */
exports.remove = () => {
  const { data: { email } } = exports;
  return User.deleteOne({ email });
};