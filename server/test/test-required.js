const predict = require('./predict');
const { expect } = require('chai');
const request = require('supertest');
const app = require('../server');
/**
 * Run test for required fields in post body requests
 *
 * @param url {string} url for post request
 * @param fields {object} complete data expected by server
 * @param required {Array} list of required field names
 */
exports.testBodyRequired = (url, fields, required) => {
  const checkMissing = (name) => {
    it(`should failed on missing ${name}`, (done) => {
      const { [name]: remove, ...otherFields } = fields;
      request(app)
        .post(url)
        .send(otherFields)
        .end((err, res) => {
          predict.response(res, 'error.missingRequiredParameters', 1, 404);
          expect(res.body.data.failed).to.be.an('array').that.does.include(name);
          done();
        });
    });
  };
  required.forEach(k => checkMissing(k));
};