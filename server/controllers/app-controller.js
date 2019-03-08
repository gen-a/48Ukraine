const path = require('path');
const fs = require('fs');
const { response } = require('../lib/response');
const { arrayToTree } = require('../lib/data-tree');
/**
 * Collect and send initial state data
 * @param req {object}
 * @param res {object}
 * @param next {Function}
 */
exports.initialState = (req, res, next) => {
  const departments = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../dummy-data/departments.json'), 'utf8'));

  res.status(200).json(response({
    departments: arrayToTree(departments)
  }, '', 0));
  return next();
};
