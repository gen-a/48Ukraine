if (process.env.NODE_ENV !== 'test') {
  console.log('run this script in NODE_ENV test mode only!');
  console.log('try to run test:win for windows or test:lin for Linux!');
  process.exit();
}
const mongoose = require('mongoose');
const request = require('supertest');
const chai = require('chai');
const app = require('../../server');
const User = require('../../models/user-model');
const predict = require('../predict');
const { testBodyRequired } = require('../test-required');

mongoose.set('useCreateIndex', true);

const { expect } = chai;
const validEmail = 'johnsmith@gmail.com';

describe('/routes/auth-routes.js API Integration Tests', () => {

  before((done) => {
    User.deleteMany({})
      .then(() => done())
      .catch(console.log);
  });

  describe('POST /data/auth/email', () => {

    testBodyRequired('/data/auth/email', { email: validEmail }, ['email']);

    it('should failed for invalid email', (done) => {
      const email = 'invalidEmail';
      request(app)
        .post('/data/auth/email')
        .send({ email })
        .end((err, res) => {
          predict.response(res, 'auth.error.invalidEmail', 1);
          expect(res.body.data).to.be.an('object').to.own.include({ email });
          done();
        });
    });

    it('should register new user with new email', (done) => {
      const email = validEmail;
      request(app)
        .post('/data/auth/email')
        .send({ email })
        .end((err, res) => {
          predict.response(res, 'auth.info.passwordHasBeenSent', 0);
          expect(res.body.data).to.be.an('object').to.own.include({ email });
          done();
        });
    });

    it('should ask to enter for existing user', (done) => {
      const email = validEmail;
      request(app)
        .post('/data/auth/email')
        .send({ email })
        .end((err, res) => {
          predict.response(res, 'auth.info.pleaseUsePasswordToEnter', 0);
          expect(res.body.data).to.be.an('object').to.own.include({ email });
          done();
        });
    });

  });

  describe('POST /data/auth/request-access', () => {
    it('should failed for not registered email', (done) => {
      const email = 'not.registered@gmail.com';
      request(app)
        .post('/data/auth/request-access')
        .send({ email })
        .end((err, res) => {
          predict.response(res, 'auth.error.noValidEntryFound', 1);
          done();
        });
    });

    it('should succeed for registered email', (done) => {
      request(app)
        .post('/data/auth/request-access')
        .send({ email: validEmail })
        .end((err, res) => {
          predict.response(res, 'auth.info.accessLetterHasBeenSent', 0);
          done();
        });
    });
  });
  describe('POST /data/auth/request-access/:visa', () => {

    it('should failed for invalid visa', (done) => {
      request(app)
        .get('/data/auth/request-access/anything')
        .end((err, res) => {
          predict.response(res, 'auth.error.noValidEntryFoundByVisa', 1);
          done();
        });
    });

    const user = User.findOne({ email: validEmail })
      .then((found) => {
        return found.visa;
      })
      .then((visa) => {

        it('should succeed for valid visa', (done) => {
          request(app)
            .get(`/data/auth/request-access${visa}`)
            .end((err, res) => {
              predict.response(res, 'auth.info.youHaveBeenLoggedIn', 0);
              done();
            });
        });
      });
  });

  after((done) => {
    User.deleteMany()
      .then(() => done())
      .catch(console.log);
  });

});
