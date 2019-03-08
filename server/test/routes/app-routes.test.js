if (process.env.NODE_ENV !== 'test') {
  console.log('run this script in NODE_ENV test mode only!');
  console.log('try to run test:win for windows or test:lin for Linux!');
  process.exit();
}
const mongoose = require('mongoose');
const request = require('supertest');
const chai = require('chai');
const app = require('../../server');

mongoose.set('useCreateIndex', true);

const { expect } = chai;

describe('API Integration Tests', () => {

  describe('/GET /data/app/initial-state', () => {

    it('should failed for missing email', (done) => {
      const locale = 'uk';
      request(app)
        .get('/data/app/initial-state')
        .send({locale})
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.all.keys(['data', 'message', 'error']);
          expect(res.body.error).to.be.a('number').to.equal(0);
          expect(res.body.message).to.be.a('string').to.equal('');
          expect(res.body.data).to.be.an('object');
          expect(res.body.data).to.have.all.keys(['departments']);
          done();
        });
    });
  });
});
