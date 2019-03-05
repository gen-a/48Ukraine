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
const Counter = require('../../models/counter-model');

mongoose.set('useCreateIndex', true);

const { expect } = chai;

describe('API Integration Tests', () => {

  before((done) => {
    User.deleteMany({})
      .then(() => done())
      .catch(console.log);
  });

  describe('/POST /data/auth/email', () => {

    const validEmail = 'johnsmith@gmail.com';

    it('should failed for missing email', (done) => {
      request(app)
        .post('/data/auth/email')
        .send({})
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.all.keys(['data', 'message', 'error']);
          expect(res.body.error).to.be.a('number').to.equal(1);
          expect(res.body.message).to.be.a('string').to.equal('auth.error.missing_email');
          expect(res.body.data).to.be.an('object');
          done();
        });
    });

    it('should failed for invalid email', (done) => {
      const email = 'invalidEmail';
      request(app)
        .post('/data/auth/email')
        .send({ email })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.all.keys(['data', 'message', 'error']);
          expect(res.body.error).to.be.a('number').to.equal(1);
          expect(res.body.message).to.be.a('string').to.equal('auth.error.invalid_email');
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
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.all.keys(['data', 'message', 'error']);
          expect(res.body.error).to.be.a('number').to.equal(0);
          expect(res.body.message).to.be.a('string').to.equal('auth.info.password_has_been_sent');
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
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.all.keys(['data', 'message', 'error']);
          expect(res.body.error).to.be.a('number').to.equal(0);
          expect(res.body.message).to.be.a('string').to.equal('auth.info.please_use_password_to_enter');
          expect(res.body.data).to.be.an('object').to.own.include({ email });
          done();
        });
    });

  });

  after((done) => {
    User.deleteMany()
      .then(() => done())
      .catch(console.log);
  });

});
