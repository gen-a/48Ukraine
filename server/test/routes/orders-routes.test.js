const config = require('../../config');
const request = require('supertest');
const axios = require('axios');
const { expect } = require('chai');
const app = require('../../server');
const mongoose = require('mongoose');
const { authenticatedRequest } = require('../authenticated-request');
const user = require('../user');
const predict = require('../predict');

mongoose.set('useCreateIndex', true);

const { mapListedProducts } = require('../../controllers/products-controller');

const order = {
  ...user.data,
  cardNumber: '5555555555554444',
  phone: '+380998811918',
  toAddress: 'Bankside St. 4467',
  toCity: 'Amsterdam',
  toFirstName: 'Ringo',
  toLastName: 'Star',
  toPhone: '+1380998811918',
  toZip: '98765',
  total: 0,
  count: 0
};



describe('/routes/orders-routes.js API Integration Tests', () => {
  before((done) => {
    /** Collect products data for the order */
    axios.get(`${config.get('app.dataUrl')}/data/products-popular`, {})
      .then(result => result.data)
      .then(({ data: { records } }) => mapListedProducts(records))
      .then((records) => {
        return [1, 5, 2, 3].map((quantity, i) => ({
          price: records[i].price.retail,
          name: records[i].name,
          quantity
        }));
      })
      .then((products) => {
        order.products = products;
        products.forEach((product) => {
          order.total += product.price * product.quantity;
          order.count += product.quantity;
        });
        return user.create();
      })
      .then(() => {
        return done();
      })
      .catch(done);
  });

  describe('POST /data/orders/add tests:', () => {
    it('should failed with missing products', (done) => {
      const { products, ...otherData } = order;
      request(app)
        .post('/data/orders/add')
        .send(otherData)
        .end((err, res) => {
          predict.response(res, 'orders.error.emptyProductList', 1);
          done();
        });
    });

    it('should succeed with new order', (done) => {
      request(app)
        .post('/data/orders/add')
        .send(order)
        .end((err, res) => {
          predict.response(res, 'order.info.theOrderHasBeenPlaced', 0);
          done();
        });
    });
  });

  describe('GET /data/orders/history tests:', () => {
    it('should failed with no registered user', (done) => {
      request(app)
        .get('/data/orders/history')
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body.message).to.equal('Not found');
          done();
        });
    });

    it('should succeed with registered user', (done) => {
      const { data: { password, email } } = user;
      authenticatedRequest({ password, email }, (req) => {
        req
          .get('/data/orders/history')
          .end((err, res) => {
            predict.response(res, '', 0);
            predict.responseRecords(res);
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
});
