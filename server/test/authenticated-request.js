const request = require('supertest');
const app = require('../server');
const URL_FOR_AUTHENTICATION = '/data/auth/login';

/**
 * Perform authenticated request
 * @param loginDetails {object}
 * @param done {Function}
 */
exports.authenticatedRequest = (loginDetails, done) => {
  const req = request.agent(app);
  req
    .post(URL_FOR_AUTHENTICATION)
    .send(loginDetails)
    .end((error) => {
      if (error) {
        throw error;
      }
      done(req);
    });
};