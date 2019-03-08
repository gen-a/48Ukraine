const path = require('path');
const fs = require('fs');
const { response } = require('../lib/response');

/**
 * Get all users
 * @param req {object}
 * @param res {object}
 * @param next {Function}
 */
exports.find = function getAllProducts(req, res, next) {
  const products = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../dummy-data/products.json'), 'utf8'));

  res.status(200).json(response(
    {
      records: products,
      total: 200
    }, '', 0));
  return next();
};
