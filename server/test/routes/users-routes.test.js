if (process.env.NODE_ENV !== 'test') {
  console.log('run this script in NODE_ENV test mode only!');
  console.log('try to run test:win for windows or test:lin for Linux!');
  process.exit();
}
const mongoose = require('mongoose');
const request = require('supertest');
const chai = require('chai');
const app = require('../../server');
const { authenticatedRequest } = require('../authenticated-request');
const user = require('../user');
const predict = require('../predict');

mongoose.set('useCreateIndex', true);

const { expect } = chai;

describe('API Integration Tests', () => {
  before((done) => {
    user.create()
      .then(() => {
        return done();
      })
      .catch(done);
  });

  describe('PUT /data/user/profile', () => {
    it('should fail on for not logged in users', (done) => {
      request(app)
        .put('/data/user/profile')
        .send({})
        .end((err, res) => {
          predict.response(res, 'auth.error.noUserFound', 1, 404);
          done();
        });
    });
  });

  describe('GET /data/user/profile', () => {
    it('should fail on for not logged in users', (done) => {
      request(app)
        .get('/data/user/profile')
        .send({})
        .end((err, res) => {
          predict.response(res, 'auth.error.noUserFound', 1, 404);
          done();
        });
    });
  });

  describe('PUT /data/user/password', () => {
    it('should fail on for not logged in users', (done) => {
      request(app)
        .put('/data/user/password')
        .send({})
        .end((err, res) => {
          predict.response(res, 'auth.error.noUserFound', 1, 404);
          done();
        });
    });
  });

  after((done) => {
    user.remove()
      .then(() => done())
      .catch(console.log);
  });
});

//router.put('/password', checkUserInRequest, checkRequiredInBody(['password']), usersController.updatePassword);

