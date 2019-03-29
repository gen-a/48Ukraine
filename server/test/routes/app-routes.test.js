if (process.env.NODE_ENV !== 'test') {
  console.log('run this script in NODE_ENV test mode only!');
  console.log('try to run test:win for windows or test:lin for Linux!');
  process.exit();
}
const mongoose = require('mongoose');
const request = require('supertest');
const chai = require('chai');
const app = require('../../server');
const predict = require('../predict');
mongoose.set('useCreateIndex', true);

const { expect } = chai;

describe('/routes/app-routes.js API Integration Tests', () => {
  describe('GET /data/app/initial-state', () => {
    it('should be succeed', (done) => {
      const locale = 'uk';
      request(app)
        .get('/data/app/initial-state')
        .send({locale})
        .end((err, res) => {
          predict.response(res, '', 0)
          expect(res.body.data).to.have.all.keys(['departments', 'cart']);
          done();
        });
    });
  });
});
