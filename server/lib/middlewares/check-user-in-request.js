const { response } = require('../response');
/**
 * Detect if user exists in request object
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
exports.checkUserInRequest = (req, res, next) => {
  if(req.user){
    return next();
  }
  res.status(404).json(response({}, 'auth.error.noUserFound', 1));
  return null;
};